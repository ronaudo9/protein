import { GetServerSideProps } from 'next';
import styles from '/styles/users.edit.module.css';
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

const MiddleNameEdit = ({
  formValues,
  setFormValues,
  readOnly,
}: any) => {
  const router = useRouter();

  // const initialValues = {
  //   middleName: user.middleName,
  // };

  // const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const EditHandler = (event: any) => {
  //   event.preventDefault();

  //   fetch(`/api/users/${user.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formValues),
  //   }).then(() => {
  //     router.push('/items/');
  //   });
  // };

  return (
    <>
      <input
        type="text"
        name="middleName"
        value={formValues.middleName}
        placeholder="例:ミドルネーム"
        onChange={handleChange}
        readOnly={readOnly}
        required
      />
    </>
  );
};
export default MiddleNameEdit;
