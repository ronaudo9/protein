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

const UsersEditName = ({ user }: any) => {
  const router = useRouter();

  const initialValues = {
    middleName: '',
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const EditHandler = (event: any) => {
    event.preventDefault();

    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    }).then(() => {
      router.push('/items/');
    });
  };

  return (
    <div>
      <div className="container">
        <header className={styles.header}>
          <div className="row">
            <h1 className={styles.h1}>ミドルネームの編集</h1>
          </div>
        </header>
      </div>
      <hr className={styles.hr}></hr>

      <div className="container">
        <form action="" method="post" onSubmit={EditHandler}>
          <div className="col-sm-8 col-sm-offset-2">
            <div className={styles.formGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  <span className="label label-danger">
                    ・ミドルネーム
                  </span>
                </label>
                <div>
                  <p className={styles.Current}> {user.middleName}</p>
                  <input
                    type="text"
                    name="middleName"
                    value={formValues.middleName}
                    placeholder="例:ミドルネーム"
                    onChange={handleChange}
                    required
                  />
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
export default UsersEditName;
