import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from './Text';
import { useAuth, useLogout } from '@/hooks/useAuth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useOutsideClick } from '@/hooks/UseOutsideClick';

export const Navbar = () => {
  const userInfo = useAuth();
  const logout = useLogout();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('logout');
  };

  const modalRef = useOutsideClick(() => setShowLogout(false));

  return (
    <div
      className="flex place-items-center justify-between gap-16 py-3 px-6 shadow-md w-full"
      ref={modalRef}
    >
      <section className="flex place-items-center border border-border rounded-lg py-3 px-4 gap-4 flex-1">
        <Icon icon="mynaui:search" fontSize={12} color="#F6B827" />
        <input type="text" className="outline-none" placeholder="search" />
      </section>
      <section className="flex place-items-center gap-6 ">
        <div className="rounded-full bg-bg p-2">
          <Icon icon="tdesign:notification" fontSize={24} />
        </div>
        <div className="rounded-full bg-bg p-2">
          <Icon icon="tabler:message-circle" fontSize={24} />
        </div>
      </section>
      <section
        className="flex place-items-center gap-3 cursor-pointer "
        onClick={() => setShowLogout((prev) => !prev)}
      >
        <div className="flex place-items-center gap-3 ">
          <img src="" alt="pp" />

          <section className="flex flex-col gap-1">
            <Text variant="silver-950" size="body-sm-default">
              {userInfo?.data?.user?.name}
            </Text>
            <Text variant="silver-600" size="body-xs-mid">
              {userInfo?.data?.user?.role}
            </Text>
          </section>
        </div>
        <section className="relative">
          <Icon icon="oui:arrow-down" fontSize={16} />
          {showLogout && (
            <div
              className="absolute -left-28 top-8 w-[15rem] h-fit bg-white shadow-sm border rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2 p-4 justify-center items-center">
                <div className="w-16 h-16 rounded-full ">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF03Doh8IEJXnq25zMHYYA4W3L90m7hTZmzdI_zOvWju4R9V0CGzdyU9Nmy7nd8qllhwU&usqp=CAU"
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                  <h1 className="text-black font-semibold">
                    {userInfo?.data?.user?.name}
                  </h1>
                  <p className="text-[#64748B] text-sm">
                    {userInfo?.data?.user?.email}
                  </p>
                  <h1 className="text-sky-600 font-semibold">
                    {userInfo?.data?.user?.role}
                  </h1>
                  <h1 className="text-[#64748B] text-sm">
                    {userInfo?.data?.user?.lastLogin
                      ? new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        }).format(new Date(userInfo.data.user.lastLogin))
                      : 'N/A'}
                  </h1>
                  <button
                    className="bg-red w-32 py-2.5 px-2 rounded flex justify-center items-center text-white font-semibold gap-2 mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
      <section className="w-[.1px] bg-bg h-full" />

      <section>
        <Icon icon="mdi-light:settings" fontSize={28} />
      </section>
    </div>
  );
};
