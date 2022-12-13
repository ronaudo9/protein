import { GetServerSideProps } from 'next';
import styles from './../styles/detail_user.module.css';
import Link from 'next/link';
import React, { SyntheticEvent, useState } from 'react';
import EmailEdit from './emailEdit';
import NameEdit from './nameEdit';
import MiddleNameEdit from './middleNameEdit';
import AddressEdit from './addressEdit';
import TelEdit from './telEdit';
import PasswordEdit from './passwordEdit';
import router, { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?id=${cookies.id}`
  );
  const users = await res.json();
  const user = users[0];
  return {
    props: { user },
  };
};

export default function UsersElements({ user }: any) {
  const [readOnly, setReadOnly] = useState(true);
  const clickHandler = (e: SyntheticEvent) => {
    setReadOnly((prev) => !prev);
    // readOnlyの初期値（true）を反転させる
  };
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    firstNameKana: user.firstNameKana,
    lastNameKana: user.lastNameKana,
    postCode: user.postCode,
    prefecture: user.prefecture,
    city: user.city,
    aza: user.aza,
    building: user.building,
    email: user.email,
    middleName: user.middleName,
    tel: user.tel,
    credit: user.credit,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation,
  };

  const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState(initialValues);

  function submit(e: SyntheticEvent) {
    e.preventDefault();

    fetch(
      `${process.env.NEXT_PUBLIC_PROTEIN}/api/users/${user.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      }
    ).then(() => {
      router.reload();
    });
  }

  return (
    <>
      <form className={styles.font} onSubmit={submit}>
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              ID(E-mail) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <EmailEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        <hr />

        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              お名前 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <div>
            <div>
              <NameEdit
                formValues={formValues}
                setFormValues={setFormValues}
                readOnly={readOnly}
              />
            </div>
            <hr />
            <div>
              <span>
                （ミドルネーム） &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <MiddleNameEdit
                formValues={formValues}
                setFormValues={setFormValues}
                readOnly={readOnly}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              住所 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <AddressEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        <hr />
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              電話番号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <TelEdit
            formValues={formValues}
            setFormValues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        <hr />
        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              クレジット &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <input
            type="credit"
            name="credit"
            className={styles.input}
            setformvalues={setFormValues}
            placeholder="例:●●●●-●●●●-●●●●-●●●●（半角数字）"
            required
            {...user.credit}
            readOnly={readOnly}
            value={formValues.credit}
          />
        </div>

        <div className={styles.elementCategory}>
          <div>
            <span className={styles.element_p1}>
              パスワード &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <PasswordEdit
            formValues={formValues}
            setformvalues={setFormValues}
            readOnly={readOnly}
          />
        </div>
        <hr />

        <button className={styles.btnB}>
          <a>完了</a>
        </button>
      </form>

      <button onClick={clickHandler} className={styles.btnB_black}>
        <a>編集</a>
      </button>
    </>
  );
}
