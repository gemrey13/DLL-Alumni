import React from "react";
import { Tab } from "@headlessui/react";

const EditProfilePage = () => {
    return (
        <>
            <section className="p-7 h-screen">
                <Tab.Group>
                    <Tab.List className="flex w-full justify-around">
                        <Tab className="w-[30%] p-2">Account</Tab>
                        <Tab className="w-[30%] p-2">Profile Information</Tab>
                        <Tab className="w-[30%] p-2">Notification</Tab>
                    </Tab.List>
                    <Tab.Panels className="">
                        <Tab.Panel>Content 1</Tab.Panel>
                        <Tab.Panel>Content 2</Tab.Panel>
                        <Tab.Panel>Content 3</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </section>
        </>
    );
};

export default EditProfilePage;
