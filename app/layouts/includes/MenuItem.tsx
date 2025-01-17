"use client"

import { AiOutlineHome } from "react-icons/ai"
import { RiGroupLine } from "react-icons/ri"
import { BsCameraVideo } from "react-icons/bs"
import { MenuItemTypes } from "@/app/types"
import { BiBookmarkAlt } from "react-icons/bi"

export default function MenuItem({ iconString, colorString, sizeString }: MenuItemTypes) {

    const icons = () => {
        if (iconString == 'หน้าหลัก') return <AiOutlineHome size={sizeString} color={colorString} />
        if (iconString == 'ที่ติดตาม') return <RiGroupLine size={sizeString} color={colorString} />
        if (iconString == 'ไลฟ์สด') return <BsCameraVideo size={sizeString} color={colorString} />
        if (iconString == 'ยอดนิยม') return <BiBookmarkAlt  size={sizeString} color={colorString} />

    }

    return (
        <>
            <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
                <div className="flex items-center lg:mx-0 mx-auto">

                    {icons()}

                    <p className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}>
                        {iconString}
                    </p>
                </div>
            </div>
        </>
    )
}
