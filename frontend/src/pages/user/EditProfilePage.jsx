import React from "react";
import { Tab } from "@headlessui/react";
import UserAccountForm from "../../components/forms/UserAccountForm";
import UserProfileForm from "../../components/forms/UserProfileForm";

const EditProfilePage = () => {
  return (
    <>
      <section className="p-2 lg:p-7 h-fit">
        <Tab.Group>
          <Tab.List className="flex w-full justify-around">
            <Tab className="w-[30%] p-2">Account</Tab>
            <Tab className="w-[30%] p-2">Profile Information</Tab>
            <Tab className="w-[30%] p-2">Notification</Tab>
          </Tab.List>
          <Tab.Panels className="pt-10">
            <Tab.Panel>
              <UserAccountForm />
            </Tab.Panel>
            <Tab.Panel>
              <UserProfileForm />
            </Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </>
  );
};

export default EditProfilePage;
