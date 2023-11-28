import { ArrowLeft, Search } from "lucide-react"
import Button from "../components/Button"
import { useState } from "react"
import { useSidebarContext } from "../contexts/SidebarProvider"

type PageHeaderFirstSectionProps = {
  showFullSearch?: boolean
}

export function PageHeaderFirstSection({
  showFullSearch = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext()

  return (
    <div
      className={`items-center flex-shrink-0
      transition-transform  duration-1000 focus:border-2 gap-2 ${
        showFullSearch ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} size={"icon"} variant={"ghost"} className="GFG">
        {/* <Menu size={30} /> */}
        <img src="/menu.svg" alt="menu" />
      </Button>
      <div className="flex items-center  cursor-pointer">
        <a href="/" className="flex ">
          <img width={40} height={40} src="/logo.png" alt="logo" />
          <h1
            className="font-extrabold text-[23px]
               text-white flex items-center
               bg-gradient-to-r from-white to-yellow-500 text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-yellow-500 hover:to-white hover:text-transparent           
          "
          >
            GoldenTube
          </h1>
        </a>
      </div>
    </div>
  )
}

const PageHeader = () => {
  const [showFullSearch, setShowFullSearch] = useState(false)

  return (
    <div
      className="flex justify-between gap-10
  lg:gap-20 pt-4 mb-6 mx-4 "
    >
      <PageHeaderFirstSection showFullSearch={showFullSearch} />
      <form
        className={`gap-4 justify-center flex-grow
      ${showFullSearch ? "flex" : "hidden md:flex"}
      `}
      >
        {showFullSearch && (
          <Button
            onClick={() => setShowFullSearch(false)}
            type="button"
            size={"icon"}
            variant={"ghost"}
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[750px] items-center">
          <input
            type="search"
            placeholder="Search"
            className="h-9 rounded-l-full w-full border border-secondary-border
            bg-transparent  placeholder-gray-400 placeholder-opacity-70
            shadow-inner shadow-secondary py-1 text-lg px-4 focus:border-gray-500  transition duration-300 focus:border-2
            outline-none
            "
          />
          <Button
            className="py-2 px-4 rounded-r-full border-secondary-border
           border h-9 border-l-0 flex-shrink-0 "
          >
            <img src="/search.svg" alt="search" width={20} height={20} />
          </Button>
        </div>
        <Button
          type="button"
          size={"icon"}
          className="w-10 h-10 flex-shrink-0 "
        >
          <img src="/mic.png" alt="mic" />
        </Button>
      </form>

      <div
        className={`items-center flex-shrink-0 md:gap-2 ${
          showFullSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullSearch(!showFullSearch)}
          variant={"ghost"}
          size={"icon"}
          className="md:hidden "
        >
          <img src="/search.svg" alt="search" width={20} height={20} />
        </Button>

        <Button
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="md:hidden"
        >
          <img src="/mic.png" alt="mic" width={24} height={24} />
        </Button>

        <Button variant={"ghost"} size={"icon"}>
          <img src="/upload-32.png" alt="upload" width={24} height={24} />
        </Button>

        <Button variant={"ghost"} size={"icon"}>
          <img src="/bell.png" alt="bell" width={24} height={24} />
        </Button>

        <Button variant={"ghost"} size={"icon"}>
          <img src="/user.png" alt="user" width={24} height={24} />
        </Button>
      </div>
    </div>
  )
}

export default PageHeader
