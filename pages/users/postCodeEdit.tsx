import { GetServerSideProps } from 'next';
import styles from '../../styles/users.edit.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  console.log(cookies.id);
  const res = await fetch(
    `http://localhost:8000/users?id=${cookies.id}`
  );
  const users = await res.json();
  const user = users[0];
  return {
    props: { user },
  };
};

const PostCodeEdit = ({ user }: any) => {
  const router = useRouter();

  const initialValues = {
    postCode: '',
    prefecture: '',
    city: '',
    aza: '',
    building: '',
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
      fetch(`/api/users/${user.id}`, {
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
    const postCodeReg = /^[0-9]{3}-[0-9]{4}$/;
    if (!postCodeReg.test(values.postCode)) {
      errors.postCode = '郵便番号はXXX-XXXXの形式で入力してください';
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
            <h1 className={styles.h1}>住所の編集</h1>
          </div>
        </header>
      </div>
      <hr className={styles.hr}></hr>

      <div className="container">
        <form action="" method="post" onSubmit={EditHandler}>
          <div className="col-sm-8 col-sm-offset-2">
            <div className={styles.formGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="postCode">
                  <span className="label label-danger">
                    ・郵便番号
                  </span>
                  （必須）
                </label>
                <button type="button" onClick={setAuto}>
                  住所検索
                </button>
                <span>{addressErrors}</span>
                <div>
                  <p className={styles.Current}> {user.postCode}</p>
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
                <p className={styles.Current}> {user.prefecture}</p>
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
                <div>
                  <label htmlFor="city">住所2(市区町村)</label>
                </div>
                <p className={styles.Current}> {user.city}</p>
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
                <div>
                  <label htmlFor="aza">住所3(字丁目)</label>
                </div>
                <p className={styles.Current}> {user.aza}</p>
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
                <div>
                  <label htmlFor="building">住所4(建物名)</label>
                </div>
                <p className={styles.Current}> {user.building}</p>

                <input
                  type="text"
                  name="building"
                  id="building"
                  placeholder="建物名"
                  value={formValues.building}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.btnPrimary}>
                <button type="submit">編集完了</button>
              </div>
              <Link href="/users/edit" legacyBehavior>
                <a className={styles.card}>
                  <h2>ユーザー編集画面はこちら &rarr;</h2>
                  <p></p>
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostCodeEdit;
