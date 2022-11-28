import { GetStaticPaths, GetStaticProps } from 'next';
import styles from '../../styles/users.edit.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:8000/users?id=${document.cookie}`);
  const users = await res.json();
  return {
    paths: users.map((users: any) => {
      return { params: { id: users.id.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: number };
}) => {
  const res = await fetch(`http://localhost:8000/users/${params.id}`);
  const user = await res.json();
  return {
    props: { user },
  };
};


function UsersEdit({user}:any) {
  const router = useRouter();

  const initialValues = {
    firstName: '',
    lastName: '',
    firstNameKana: '',
    lastNameKana: '',
    middleName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postCode: '',
    prefecture: '',
    city: '',
    aza: '',
    building: '',
    tel: '',
    deleted: false,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [addressErrors, setAddressErrors] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const EditHandler = (event: any) => {
    event.preventDefault();
    const newErrors = validate(formValues);
    setFormErrors(newErrors);
    setIsSubmit(true);
    if (Object.keys(newErrors).length !== 0) {
      return isSubmit;
    } else {
      fetch(`/api/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      }).then(() => {
        router.push('/items/');
      });
    }
  };

  const validate = (values: any) => {
    const errors = {} as any;

    const emailReg = /.+@.+\..+/;
    const postCodeReg = /^[0-9]{3}-[0-9]{4}$/;
    const passwordReg = /^[0-9a-zA-Z]*$/;
    const telReg =
      /^(0[5-9]0-[0-9]{4}-[0-9]{4}|0[0-9]{3}-[0-9]{2}-[0-9]{4})$/;

    if (!emailReg.test(values.email)) {
      errors.email = 'メールアドレスの形式が不正です';
    }

    if (values.password.length < 8) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    } else if (values.password.length > 16) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    }
    else if (!passwordReg.test(values.password)) {
      errors.password = 'パスワードは半角英数字で記載してください';
    }

    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation =
        'パスワードと確認用パスワードが不一致です';
    }
    else if (!passwordReg.test(values.passwordConfirmation)) {
      errors.passwordConfirmation =
        '確認用パスワードは半角英数字で記載してください';
     }
    if (!postCodeReg.test(values.postCode)) {
      errors.postCode = '郵便番号はXXX-XXXXの形式で入力してください';
    }
    // if (!values.prefecture) {
    //   errors.prefecture = '都道府県を入力してください';
    // }
    // if (!values.city) {
    //   errors.city = '市区町村を入力してください';
    // }
    // if (!values.aza) {
    //   errors.aza = '字丁目を入力してください';
    // }
    // if (!values.tel) {
    //   errors.tel = '電話番号を入力してください';}
    if (!telReg.test(values.tel)) {
      errors.tel =
        '電話番号はXXX-XXXX-XXXXかXXXX-XX-XXXXの形式で入力してください';
    }
    return errors;
  };

  // 住所検索機能
  const setAuto = async () => {
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formValues.postCode}`
    );
    const getAddress = await res.json();
    if (getAddress.results === null) {
      const message = '存在しない郵便番号です';
      setAddressErrors(message);
    } else {
      const pre = getAddress.results[0].address1;
      const city = getAddress.results[0].address2;
      const aza = getAddress.results[0].address3;
      setFormValues({
        ...formValues,
        prefecture: pre,
        city: city,
        aza: aza,
      });
      setAddressErrors('');
    }
  };
  return (
    <div>
    <div className="container">
      <header className={styles.header}>
        <div className="row">
          <h1 className={styles.h1}>ユーザー登録</h1>
        </div>
      </header>
    </div>
    <hr className={styles.hr}></hr>

    <div className="container">
      <form action="" method="post" onSubmit={EditHandler}>
        <div className="col-sm-8 col-sm-offset-2">
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <span className="label label-danger">・お名前</span>
              （必須）
            </label>
            <div>
              <input
                type="text"
                name="firstName"
                className={styles.input}
                placeholder="例:姓"
                value={formValues.firstName}
                onChange={handleChange}
                required
              />
              &nbsp;
              <span>
                <input
                  type="text"
                  name="lastName"
                  className={styles.input}
                  placeholder="例:名"
                  value={formValues.lastName}
                  onChange={handleChange}
                  required
                />
              </span>
              {/* <p>{formErrors?.name}</p> */}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <span className="label label-danger">・ふりがな</span>
              （必須）
            </label>
            <div>
              <input
                type="text"
                name="firstNameKana"
                className={styles.input}
                placeholder="例:ふりがな（姓）"
                value={formValues.firstNameKana}
                onChange={handleChange}
                required
              />
              &nbsp;
              <span>
                <input
                  type="text"
                  name="lastNameKana"
                  className={styles.input}
                  placeholder="例:ふりがな（名）"
                  value={formValues.lastNameKana}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <span className="label label-danger">
                ・ミドルネーム
              </span>
              （任意）
            </label>
            <div>
              <input
                type="text"
                name="middleName"
                //   className={styles.input}
                value={formValues.middleName}
                placeholder="例:ミドルネーム"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <span className="label label-danger">
                ・Eメールアドレス
              </span>
              （必須）
            </label>
            <div>
              <input
                type="email"
                name="email"
                className={styles.inputEmail}
                value={formValues.email}
                placeholder="例:raffaello@jungleocean.com"
                onChange={handleChange}
                required
              />
              <p>{formErrors?.email}</p>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">
              <span className="label label-danger">
                ・パスワード
              </span>
              （必須）
            </label>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="例:半角英数でご入力ください"
                required
              />
              <p>{formErrors?.password}</p>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">
              <span className="label label-danger">
                ・確認用パスワード
              </span>
              （必須）
            </label>
            <div>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={formValues.passwordConfirmation}
                onChange={handleChange}
                className={styles.input}
                placeholder="例:もう一度パスワードをご入力ください"
                required
              />
              <p>{formErrors?.passwordConfirmation}</p>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="postCode">
              <span className="label label-danger">・郵便番号</span>
              （必須）
            </label>
            <button type="button" onClick={setAuto}>
              住所検索
            </button>
            <span>{addressErrors}</span>
            <div>
              <input
                type="text"
                name="postCode"
                className={styles.input}
                value={formValues.postCode}
                placeholder="例:●●●-●●●●"
                onChange={handleChange}
                required
              />
              <p>{formErrors?.postCode}</p>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div>
              <label htmlFor="prefecture">住所1(都道府県)</label>
            </div>
            <input
              type="text"
              name="prefecture"
              id="prefecture"
              placeholder="都道府県"
              value={formValues.prefecture}
              onChange={handleChange}
              className={styles.input}
              required
            />
            {/* <p>{formErrors?.prefecture}</p> */}
            <div>
              <label htmlFor="city">住所2(市区町村)</label>
            </div>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="市区町村"
              value={formValues.city}
              onChange={handleChange}
              className={styles.input}
              required
            />
            {/* <p>{formErrors?.city}</p> */}
            <div>
              <label htmlFor="aza">住所3(字丁目)</label>
            </div>
            <input
              type="text"
              name="aza"
              id="aza"
              placeholder="字丁目"
              value={formValues.aza}
              onChange={handleChange}
              className={styles.input}
              required
            />
            {/* <p>{formErrors?.aza}</p> */}
            <div>
              <label htmlFor="building">住所4(建物名)</label>
            </div>
            <input
              type="text"
              name="building"
              id="building"
              placeholder="建物名"
              value={formValues.building}
              onChange={handleChange}
            />
            {/* <p>{formErrors?.building}</p> */}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tel">
              <span className="label label-danger">・電話番号</span>
              （必須）
            </label>
            <div>
              <input
                type="tel"
                name="tel"
                className={styles.input}
                value={formValues.tel}
                placeholder="例:●●●-●●●●-●●●●（半角数字）"
                onChange={handleChange}
                required
              />
              <p>{formErrors?.tel}</p>
            </div>
          </div>
          <div className={styles.btnPrimary}>
              <button type="submit">編集完了</button>
            </div>
            <div className={styles.btnPrimary}>
              <Link href="/users/new" legacyBehavior>
                <a className={styles.card}>
                  <h2>クレジットカード情報変更はこちら &rarr;</h2>
                  <p></p>
                </a>
              </Link>
            </div>
        </div>
      </form>
    </div>
  </div>
  );
}
export default UsersEdit;
