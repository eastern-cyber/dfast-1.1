import Link from "next/link"
import { debounce } from "debounce";
import { useRouter, usePathname } from "next/navigation"
import { BiSearch, BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/user"
import { useGeneralStore } from "@/app/stores/general"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { RandomUsers } from "@/app/types"
import useSearchProfilesByName from "@/app/hooks/useSearchProfilesByName";
import Image from "next/image";


export default function TopNav() {    
    const userContext = useUser()
    const router = useRouter()
    const pathname = usePathname()

    const [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([])
    let [showMenu, setShowMenu] = useState<boolean>(false)
    let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore()

    useEffect(() => { setIsEditProfileOpen(false) }, [])

    const handleSearchName = debounce(async (event: { target: { value: string } }) => {
        if (event.target.value == "") return setSearchProfiles([])

        try {
            const result = await useSearchProfilesByName(event.target.value)
            if (result) return setSearchProfiles(result)
            setSearchProfiles([])
        } catch (error) {
            console.log(error)
            setSearchProfiles([])
            alert(error)
        }
    }, 500)

    const goTo = () => {
        if (!userContext?.user) return setIsLoginOpen(true)
        router.push('/upload')
    }

    return (
        <>
            <div id="TopNav" className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]">
                <div className={`flex items-center justify-between gap-4 w-full px-3 sm:px-4 mx-auto ${pathname === '/' ? 'max-w-[1150px]' : 'max-w-xs sm:max-w-full'}`}>
                {/* <div className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${pathname === '/' ? 'max-w-[1150px]' : ''}`}> */}
                <Link href="/" className='flex items-center font-black text-xl gap-2 group'>
                <div className="w-[130px] sm:w-[150px] h-[60px] flex items-center">
                    <Image 
                    src="/images/3k-logo_800x700.png" 
                    alt="3K"
                    width={70} 
                    height={45} 
                    />
                    <p className="ml-2 text-sm sm:text-base">
                    {/* <p className="mt-3 mb-2 ml-4"> Add margin to the left of the text */}
                    <span className="text-[#330099]">ก๊อกๆๆ</span>
                    <br />
                    <span className="text-[14px] sm:text-[18px] font-light">v.1.2.1</span>
                    {/* <span className="text-[18px] font-light">v.1.2.1</span> */}
                    </p>
                </div>
                </Link>
                    {/* <Link href="/">
                        <img className="min-w-[115px] w-[115px]" src="/images/3k-logo_272x146.png"/>
                    </Link> */}

                    <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px] w-full">
                            <input 
                                type="text" 
                                onChange={handleSearchName}
                                className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
                                placeholder="ค้นหาผู้ใช้งาน"
                            />

                            {searchProfiles.length > 0 ?
                                <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
                                    {searchProfiles.map((profile, index) => (
                                        <div className="p-1" key={index}>
                                            <Link 
                                                href={`/profile/${profile?.id}`}
                                                className="flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white"
                                            >
                                                <div className="flex items-center">
                                                    <img className="rounded-md" width="40" src={useCreateBucketUrl(profile?.image)} />
                                                    <div className="truncate ml-2">{ profile?.name }</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            : null}

                            <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
                                <BiSearch color="#A1A2A7" size="22" />
                            </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <button 
                            onClick={() => goTo()}
                            className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
                        >
                            <AiOutlinePlus color="#000000" size="20"/>
                            <span className="px-2 font-medium">อัพโหลด</span>
                        </button>

                        {!userContext?.user?.id ? (
                            <div className="flex items-center">
                                <button 
                                    onClick={() => setIsLoginOpen(true)}
                                    className="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px]"
                                >
                        <span className="whitespace-nowrap mx-2 sm:mx-4 font-medium">ล็อกอิน</span>
                        </button>
                                <BsThreeDotsVertical color="#161724" size="25"/>
                            </div>
                        ) : (
                            <div className="flex items-center">

                                <div className="relative">

                                    <button 
                                        onClick={() => setShowMenu(showMenu = !showMenu)} 
                                        className="mt-1 border border-gray-200 rounded-full"
                                    >
                                        <img className="rounded-full w-[35px] h-[35px]" src={useCreateBucketUrl(userContext?.user?.image || '')} />
                                    </button>
                                    
                                    {showMenu ? (
                                        <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
                                            <button 
                                                onClick={() => { 
                                                    router.push(`/profile/${userContext?.user?.id}`)
                                                    setShowMenu(false)
                                                }}
                                                className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <BiUser size="20"/>
                                                <span className="pl-2 font-semibold text-sm">โปรไฟล์</span>
                                            </button>
                                            <button 
                                                onClick={async () => {
                                                    await userContext?.logout()
                                                    setShowMenu(false)
                                                }} 
                                                className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-gray-100 border-t cursor-pointer"
                                            >
                                                <FiLogOut size={20} />
                                                <span className="pl-2 font-semibold text-sm">ล็อกเอ้าท์</span>
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
  