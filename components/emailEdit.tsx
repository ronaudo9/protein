import { GetServerSideProps } from 'next';
import styles from '/styles/detail_user.module.css';
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

const EmailEdit = ({ formValues, setFormValues, readOnly }: any) => {
  const router = useRouter();

  // const initialValues = {
  //   email: user.emai,
  // };

  // const [formValues, setFormValues] = useState(initialValues);

  // const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const EditHandler = (event: any) => {
  //   event.preventDefault();
  //   const newErrors = validate(formValues);
  //   setFormErrors(newErrors);
  //   setIsSubmit(true);
  //   if (Object.keys(newErrors).length !== 0) {
  //     return isSubmit;
  //   } else {
  //     fetch(`/api/users/${formValues.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formValues),
  //     }).then(() => {
  //       router.push('/items/');
  //     });
  //   }
  // };

  // const validate = (values: any) => {
  //   const errors = {} as any;

  //   const emailReg = /.+@.+\..+/;

  //   if (!emailReg.test(values.email)) {
  //     errors.email = 'メールアドレスの形式が不正です';
  //   }
  //   return errors;
  // };

  return (
    <>
      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          className={styles.inputEmail}
          value={formValues.email}
          placeholder="例:raffaello@jungleocean.com"
          onChange={handleChange}
          readOnly={readOnly}
        />
        {/* <div>{formErrors?.email}</div> */}
      </div>
    </>
  );
};
export default EmailEdit;
