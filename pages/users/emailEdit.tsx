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


const EmailEdit = ({ user }: any) => {
  const router = useRouter();

  const initialValues = {
    email: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);


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

    const emailReg = /.+@.+\..+/;

    if (!emailReg.test(values.email)) {
      errors.email = 'メールアドレスの形式が不正です';
    }
    return errors;
  };

  return (
    <div>
      <div className="container">
        <header className={styles.header}>
          <div className="row">
            <h1 className={styles.h1}>Eメールアドレスの編集</h1>
          </div>
        </header>
      </div>
      <hr className={styles.hr}></hr>

      <div className="container">
        <form action="" method="post" onSubmit={EditHandler}>
          <div className="col-sm-8 col-sm-offset-2">
            <div className={styles.formGroup}>

            <div className={styles.formGroup}>
              <label htmlFor="email">
                <span className="label label-danger">
                  ・Eメールアドレス
                </span>
              </label>
              <p className={styles.Current}> {user.email}</p>
              <div>
                <input
                  type="email"
                  name="email"
                  className={styles.inputEmail}
                  value={formValues.email}
                  placeholder="例:raffaello@jungleocean.com"
                  onChange={handleChange}
                />
                <p>{formErrors?.email}</p>
              </div>
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
export default EmailEdit;
