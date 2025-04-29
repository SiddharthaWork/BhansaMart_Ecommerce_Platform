import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarMainRoutes, SidebarSettingsRoutes } from '../../routes';
import { Text } from './Text';
import React from 'react';
interface sidebarProps {
  miniSidebar: boolean;
  setMiniSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SideBar = ({ miniSidebar, setMiniSidebar }: sidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // const [currentId, setCurrentId] = useState(1);

  const location = useLocation();

  // Find active parent ID based on current path
  const findActiveParentId = () => {
    const allRoutes = [
      ...SidebarMainRoutes.routes,
      ...SidebarSettingsRoutes.routes,
    ];

    // First, check if current path matches any child route
    for (const route of allRoutes) {
      if (route.children) {
        const childMatch = route.children.find((child) =>
          location.pathname.startsWith(child.path)
        );
        if (childMatch) return route.id;
      }
    }

    // Then, check if the path starts with a main route (excluding "/")
    const mainRouteMatch = allRoutes.find(
      (route) => location.pathname.startsWith(route.path) && route.path !== '/' // Prevent "/" from staying active
    );

    return mainRouteMatch?.id || 1; // Default to Dashboard (id:1)
  };

  const currentParentId = findActiveParentId();

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative" id="sidebar">
      <div
        className="absolute top-16 -right-2 text-xl z-[99999] bg-white p-1 border-border  rounded-md"
        onClick={() => setMiniSidebar((prev) => !prev)}
      >
        <Icon icon={'mdi-light:unfold-more-vertical'} />
      </div>
      <div className="flex flex-col rounded-2xl border border-border">
        <div className="border-b border-border h-[82px]">
          <section
            className={`flex place-items-center  justify-between ${miniSidebar ? 'h-[82px] w-[72px]' : 'h-[62px] w-[60px]'}`}
            id="logo-top-bar"
          >
            <img
              src="/companylogo.png"
              alt="company-logo"
              className={`h-full w-full`}
              id="logo"
            />
            <Icon icon="flowbite:dots-vertical-outline" id="outline" />
          </section>
        </div>

        <section
          className={`flex flex-col pt-6 ${!miniSidebar ? 'items-center' : ''}  gap-2`}
          id="main-menu"
        >
          <div className={`${!miniSidebar ? 'px-3 ' : 'px-6'}`}>
            <Text variant="fadish-black" size="body-xs-default" uppercase>
              {SidebarMainRoutes.title}
            </Text>
          </div>

          <div
            className="flex flex-col  gap-2"
            id="menu"
            onClick={() => setMiniSidebar(true)}
          >
            {SidebarMainRoutes.routes.map((route) => (
              <div key={route.id}>
                <Link
                  to={route.path}
                  className={`flex place-items-center ${miniSidebar ? 'px-6' : 'px-3'}   py-3 gap-5 justify-between hover:bg-bg hover:rounded-lg ${
                    currentParentId === route.id ? 'bg-bg' : ''
                  }`}
                  onClick={() => {
                    if (route.children) toggleExpand(route.id);
                    // setCurrentId(route.id);
                  }}
                >
                  <section className="flex place-items-center gap-3">
                    <Icon
                      icon={route.icon}
                      color={`${currentParentId === route.id ? '#2275FC' : '#5C5E64'}`}
                    />

                    {miniSidebar && (
                      <Text
                        variant={`${
                          currentParentId === route.id
                            ? 'primary-blue'
                            : 'fadish-black'
                        }`}
                        size="body-sm-default"
                      >
                        {route.title}
                      </Text>
                    )}
                  </section>
                  {miniSidebar && (
                    <div>
                      {route.children && (
                        <Icon icon="oui:arrow-down" fontSize={16} />
                      )}
                    </div>
                  )}
                </Link>
                {miniSidebar && (
                  // <div>
                  //   {route.children && expandedItems.includes(route.id) && (
                  //     <div className="ml-8 mt-1 flex flex-col relative">
                  //       {/* Vertical line */}
                  //       <div
                  //         className={`absolute left-[0.3125rem] top-0 bottom-0 w-px bg-gray-200`}
                  //       />

                  //       {route.children.map((child) => (
                  //         <Link
                  //           to={child.path}
                  //           key={child.id}
                  //           className="flex place-items-center py-1  pl-4 relative  rounded-lg"
                  //         >
                  //           {/* Dot with horizontal line */}
                  //           <div className="absolute left-[0.1rem] top-1/2 -translate-y-1/2">
                  //             <div
                  //               className={`h-2 w-2 rounded-full ${location.pathname === child.path ? 'bg-primary-blue' : 'bg-gray-300'} `}
                  //             />
                  //           </div>

                  //           <Text
                  //             variant={
                  //               location.pathname === child.path
                  //                 ? 'primary-blue'
                  //                 : 'fadish-black'
                  //             }
                  //             size="body-sm-default"
                  //             className={`hover:bg-gray-50 py-2 px-3  rounded ${location.pathname === child.path ? 'bg-gray-50 ' : ''}`}
                  //           >
                  //             {child.title}
                  //           </Text>
                  //         </Link>
                  //       ))}
                  //     </div>
                  //   )}
                  // </div>
                  // manoj

                  <div>
                    {route.children && expandedItems.includes(route.id) && (
                      <div className="ml-8 mt-1 flex flex-col relative">
                        {/* Vertical line */}
                        <div className="absolute left-[0.3125rem] top-0 bottom-0 w-px bg-gray-200" />

                        {route.children.map((child) => {
                          // Only make the child active if it's not "/" or the current path starts with the child's path
                          const isActive =
                            (location.pathname.startsWith(child.path) &&
                              child.path !== '/') ||
                            location.pathname === child.path;

                          return (
                            <Link
                              to={child.path}
                              key={child.id}
                              className="flex place-items-center py-1 pl-4 relative rounded-lg"
                            >
                              {/* Dot with horizontal line */}
                              <div className="absolute left-[0.1rem] top-1/2 -translate-y-1/2">
                                <div
                                  className={`h-2 w-2 rounded-full ${isActive ? 'bg-primary-blue' : 'bg-gray-300'}`}
                                />
                              </div>

                              <Text
                                variant={
                                  isActive ? 'primary-blue' : 'fadish-black'
                                }
                                size="body-sm-default"
                                className={`hover:bg-gray-50 py-2 px-3 rounded ${isActive ? 'bg-gray-50' : ''}`}
                              >
                                {child.title}
                              </Text>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2 pt-6 pb-[178px] border-b border-border ">
          <div className="px-2">
            <Text variant="fadish-black" size="body-xs-default" uppercase>
              {SidebarSettingsRoutes.title}
            </Text>
          </div>

          <div
            className={`flex flex-col ${!miniSidebar ? 'items-center' : ''} gap-2 `}
            id="menu"
          >
            {SidebarSettingsRoutes.routes.map((route) => (
              <div key={route.id} onClick={() => setMiniSidebar(true)}>
                <Link
                  to={route.path}
                  className={`flex place-items-center px-6  py-3 justify-between hover:bg-bg hover:rounded-lg ${
                    currentParentId === route.id ? 'bg-bg' : ''
                  }`}
                  onClick={() => {
                    if (route.children) toggleExpand(route.id);
                    // setCurrentId(route.id);
                  }}
                >
                  <section className="flex place-items-center gap-3 ">
                    <Icon
                      icon={route.icon}
                      color={`${currentParentId === route.id ? '#2275FC' : '#5C5E64'}`}
                    />

                    {miniSidebar && (
                      <Text
                        variant={`${
                          currentParentId === route.id
                            ? 'primary-blue'
                            : 'fadish-black'
                        }`}
                        size="body-sm-default"
                      >
                        {route.title}
                      </Text>
                    )}
                  </section>

                  {route.children && (
                    <Icon
                      icon="oui:arrow-down"
                      fontSize={16}
                      className={`${!miniSidebar ? 'hidden' : 'block'} `}
                    />
                  )}
                </Link>
                {miniSidebar && (
                  <div>
                    {route.children && expandedItems.includes(route.id) && (
                      <div className="ml-8 flex flex-col relative">
                        {/* Vertical line */}
                        <div className="absolute left-[0.3125rem] top-0 bottom-0 w-px bg-gray-200" />
                        {route.children.map((child) => (
                          <Link
                            to={child.path}
                            key={child.id}
                            className="flex place-items-center py-2 pl-6 relative  rounded-lg"
                          >
                            {/* Dot with horizontal line */}
                            <div className="absolute left-[0.125rem] top-1/2 -translate-y-1/2">
                              <div className="h-2 w-2 rounded-full bg-gray-300" />
                            </div>

                            <Text
                              variant="fadish-black"
                              size="body-sm-default"
                              className="hover:bg-gray-50 "
                            >
                              {child.title}
                            </Text>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
