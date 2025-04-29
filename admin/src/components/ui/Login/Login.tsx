import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import { useLogin } from '../../../server-action/api/login';
import z from 'zod';
import { toast } from 'react-toastify';

// Define the type for form values
type LoginFormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const { mutateAsync: createLogin } = useLogin();

  const userSchema = z.object({
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password is too long'),
  });

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: userSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createLogin(value);
      } catch (error) {
        console.error('Login failed:', error);
        toast.error(error as string);
      }
    },
  });

  return (
    <div className="w-full min-h-screen justify-center items-center bg-[#F0F6FA] xl:p-16 md:p-12 flex gap-4">
      <div className="md:flex justify-center items-center md:w-1/2 w-full h-full hidden">
        <img src="/login.png" alt="Login" className="w-[80%] h-[80%]" />
      </div>
      <div className="flex justify-center items-center md:w-1/2 w-full h-full md:p-0 p-10 ">
        <div className="xl:w-[80%] w-full h-full bg-white rounded-xl shadow-lg border flex flex-col items-center justify-start py-10 xl:pb-24 xl:gap-8 gap-6">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/bhansamart.png"
              alt="Bhansa Mart"
              className="xl:w-[16rem] xl:h-[16rem] md:w-[12rem] md:h-[12rem] w-[10rem] h-[10rem] object-cover"
            />
            <h1 className="xl:text-2xl md:text-xl text-lg font-bold">
              Login into your account
            </h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col items-start justify-center w-full xl:px-20 md:px-12 sm:px-10 px-8 xl:gap-6 gap-4"
          >
            <div className="flex flex-col w-full h-fit gap-3">
              <p className="text-base text-[#555]">Email Address</p>
              <div className="relative">
                <form.Field name="email">
                  {(field) => (
                    <>
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          e.preventDefault();
                          field.handleChange(e.target.value);
                        }}
                        type="email"
                        className={`w-full h-12 border rounded-lg px-4 bg-[#F1F3F6] placeholder:text-[#555] focus:outline-none ${
                          field.state.meta.errors.length > 0 ? 'border-red' : ''
                        }`}
                        placeholder="jhondoe@gmail.com"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-red text-sm mt-1">
                          {field.state.meta.errors[0]}
                        </span>
                      )}
                    </>
                  )}
                </form.Field>

                <div className="absolute top-0 right-0 w-[3rem] h-[3rem] bg-[#83b2fc] rounded-lg flex place-items-center justify-center">
                  <Icon
                    icon="ic:outline-mail"
                    width="24"
                    height="24"
                    color="white"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full h-fit gap-3">
              <p className="text-base text-[#555]">Password</p>
              <div className="relative">
                <form.Field name="password">
                  {(field) => (
                    <>
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          e.preventDefault();
                          field.handleChange(e.target.value);
                        }}
                        type="password"
                        className={`w-full h-12 border rounded-lg px-4 bg-[#F1F3F6] placeholder:text-[#555] focus:outline-none ${
                          field.state.meta.errors.length > 0
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="Enter your password"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-red text-sm mt-1">
                          {field.state.meta.errors[0]}
                        </span>
                      )}
                    </>
                  )}
                </form.Field>

                <div className="absolute top-0 right-0 w-[3rem] h-[3rem] bg-[#83b2fc] rounded-lg flex place-items-center justify-center">
                  <Icon
                    icon="material-symbols:lock-outline"
                    width="24"
                    height="24"
                    color="white"
                  />
                </div>
              </div>
              <a
                href="#"
                className="flex justify-end text-[#555] text-sm font-normal underline"
              >
                Forget Password?
              </a>
              <button
                className="w-full bg-[#2275FC] h-12 rounded-lg text-white mt-4"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
