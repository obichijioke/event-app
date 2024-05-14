"use client";
import { Formik, Form, Field } from "formik";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login, user, loading }: any = useAuthContext();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    router.push("/");
  }
  return (
    <div className="max-w-lg mx-auto p-4 bg-zinc-800 text-white">
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false);
          await login({
            email: values.email,
            password: values.password,
          });
          actions.resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Your Email*
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full p-2 bg-zinc-700 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password*
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="w-full p-2 bg-zinc-700 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-3"
            >
              Sign Up
            </button>
            <p className="text-sm text-zinc-400 mb-6">
              By clicking &quot;Sign up&quot;, you agree to Barren Terms &
              Conditions and have read the Privacy Policy.
            </p>
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-zinc-600"></div>
              <span className="px-4 text-zinc-400">or</span>
              <div className="flex-grow h-px bg-zinc-600"></div>
            </div>
            <button
              type="button"
              className="w-full mb-2 py-2 px-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded flex items-center justify-center"
            >
              <img
                src="https://placehold.co/20x20"
                alt="Google"
                className="mr-2"
              />
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded flex items-center justify-center"
            >
              <img
                src="https://placehold.co/20x20"
                alt="Facebook"
                className="mr-2"
              />
              Sign in with Facebook
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
