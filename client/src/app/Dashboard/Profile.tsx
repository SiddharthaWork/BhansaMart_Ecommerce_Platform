import { useCallback, useState } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../../redux/api/rest/authApi";
// import { useGetUserQuery } from "../../redux/api/graphqlBaseApi";
import ChangePassDialog from "./components/ChangePassDialog";
import useFetchUserById from "../../hooks/useFetchUserById";
import Loading from "../../components/shared/Loading";

// interface UserType {
//   email: string;
//   name: string;
//   dob: Date | string;
//   gender: string;
//   address: string;
//   phone: string;
// }
const Profile = () => {
  // const configUser = useSelector((state: RootState) => state.configUser);
  // const user: UserType | null = configUser?.user as UserType | null;
  // const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // const userString = localStorage.getItem("user");
  // const userData = userString ? JSON.parse(userString) : null;
  // const userId = userData?._id;

  // const { data } = useGetUserQuery({
  //   userId: userId,
  // });
  const { data: user, isLoading } = useFetchUserById();

  const [updateProfile] = useUpdateProfileMutation();
  const [profileState, setProfileState] = useState<string>("profile");

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChangePass = () => {
    setDialogOpen(true);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Mobile number is required"),
  });
  const handleEditClick = useCallback(() => {
    setProfileState("edit");
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const res = await updateProfile(values).unwrap();
      if (res?.success) {
        toast.success("Profile updated successfully");
        setProfileState("profile");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Profile update failed, Try Again");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: user?.getUser?.name || "",
      email: user?.getUser?.email || "",
      dob: user?.getUser?.dob
        ? moment(user.getUser.dob).format("YYYY-MM-DD")
        : "",
      gender: user?.getUser?.gender || "",
      address: user?.getUser?.address || "",
      phone: user?.getUser?.phone || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });
  // console.log("date", user?.dob ? moment(new Date(user.dob)).format("YYYY-MM-DD") : "No dob available");

  // console.log("formik", formik?.values);
  // console.log("profilestate", profileState)

  return (
    <div className="max-w-2xl p-6">
      {isLoading && (
        <Loading />
      )}
      <h2 className="mt-1 mb-8 text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
        {profileState === "profile" ? "My" : "Edit"} Profile
      </h2>
      <FormikProvider value={formik}>
        <Form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disabled={profileState === "profile"}
                className={`w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none ${formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.name as string}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled
                // disabled={profileState === "profile"}
                className={`w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none ${formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.email as string}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">Date of birth</label>
              <input
                type="date"
                name="dob"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                disabled={profileState === "profile"}
                className={`w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none ${formik.touched.dob && formik.errors.dob
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.dob && formik.errors.dob && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.dob}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">Gender</label>
              <select
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                disabled={profileState === "profile"}
                className="w-full px-0 py-1 bg-transparent border-b border-black appearance-none focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.gender as string}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">Address</label>
              <input
                type="text"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                disabled={profileState === "profile"}
                className={`w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none ${formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.address as string}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">Mobile no.</label>
              <input
                type="string"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                disabled={profileState === "profile"}
                className={`w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none ${formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.phone as string}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            {profileState === "profile" && (
              <button
                type="button"
                className="px-4 py-2 text-white bg-teal-700 rounded-md hover:bg-teal-800"
                onClick={handleEditClick}
              >
                Edit profile
              </button>
            )}
            {profileState === "edit" && (
              <button
                type="submit"
                disabled={formik.isSubmitting}
                // onClick={handleSubmit}
                className="px-4 py-2 text-white bg-teal-700 rounded-md hover:bg-teal-800"
              >
                Save changes
              </button>
            )}
            <button
              type="button"
              onClick={handleChangePass}
              className="px-4 py-2 text-white bg-teal-700 rounded-md hover:bg-teal-800"
            >
              Change password
            </button>
          </div>
        </Form>
      </FormikProvider>
      {dialogOpen && (
        <ChangePassDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
