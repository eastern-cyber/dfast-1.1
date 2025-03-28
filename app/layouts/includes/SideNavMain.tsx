import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuItem from "./MenuItem"
import MenuItemFollow from "./MenuItemFollow"
import { useEffect } from "react"
import { useUser } from "@/app/context/user"
import ClientOnly from "@/app/components/ClientOnly"
import { useGeneralStore } from "@/app/stores/general"

export default function SideNavMain() {

    let { setRandomUsers, randomUsers} = useGeneralStore()

    const contextUser = useUser()
    const pathname = usePathname()

    useEffect(() => { setRandomUsers() }, [])
    return (
        <>
            <div 
                id="SideNavMain" 
                className={`
                    fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
                    ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}
                `}
            >
                
                <div className="lg:w-full w-[55px] mx-auto">
                    <Link href="/">
                        <MenuItem 
                            iconString="หน้าหลัก" 
                            colorString={pathname == '/' ? '#F02C56' : ''} 
                            sizeString="25"
                        />
                    </Link>
                    <MenuItem iconString="ที่ติดตาม" colorString="#000000" sizeString="25"/>
                    <MenuItem iconString="ไลฟ์สด" colorString="#000000" sizeString="25"/>
                    <Link href="https://youlive.world/shorts/baifern-bah_xeq7v19gylw4FxC.html">
                        <MenuItem 
                            iconString="ยอดนิยม" 
                            colorString={pathname == 'https://youlive.world/' ? '#F02C56' : ''} 
                            sizeString="25"
                        />
                    </Link>
                    <Link href="https://youlive.world/menu4">
                        <MenuItem 
                            iconString="ข่าว" 
                            colorString={pathname == 'https://youlive.world/' ? '#F02C56' : ''} 
                            sizeString="25"
                        />
                    </Link>
                    <Link href="https://youlive.world/menu9">
                        <MenuItem 
                            iconString="คลิปสั้น" 
                            colorString={pathname == 'https://youlive.world/' ? '#F02C56' : ''} 
                            sizeString="25"
                        />
                    </Link>


                    <div className="border-b lg:ml-2 mt-2" />
                    <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">บัญชีผู้ใช้ที่แนะนำ</h3>

                    <div className="lg:hidden block pt-3" />
                    <ClientOnly>
                        <div className="cursor-pointer">
                            {randomUsers?.map((user, index) => ( 
                                <MenuItemFollow key={index} user={user} /> 
                            ))}
                        </div>
                    </ClientOnly>

                    <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">ดูทั้งหมด</button>

                    {contextUser?.user?.id ? (
                        <div >
                            <div className="border-b lg:ml-2 mt-2" />
                            <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">ผู้ใช้ที่ท่านติดตามอยู่</h3>

                            <div className="lg:hidden block pt-3" />
                            <ClientOnly>
                                <div className="cursor-pointer">
                                    {randomUsers?.map((user, index) => ( 
                                        <MenuItemFollow key={index} user={user} /> 
                                    ))}
                                </div>
                            </ClientOnly>

                            <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">ดูเพิ่ม</button>
                        </div>
                    ) : null}
                    <div className="lg:block hidden border-b lg:ml-2 mt-2" />

                    <div className="lg:block hidden text-[11px] text-gray-500">
                        <p className="pt-4 px-2">3K - ก๊อกๆๆ โซเชียลแอ๊พยุคใหม่</p>
                        <p className="pt-4 px-2">Good Governance & Transparency - โปร่งใสตรวจสอบได้</p>
                        <p className="pt-4 px-2">Privacy & Safety Policy  - นโยบายความปลอดภัย</p>
                        <p className="pt-4 px-2">© 2024 - KokKokKok - ก๊อกๆๆ !</p>
                    </div>

                    <div className="pb-14"></div>
                </div>

            </div>
        </>
    )
}
