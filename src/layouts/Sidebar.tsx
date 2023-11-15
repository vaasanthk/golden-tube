import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  History,
  Library,
  ListVideo,
  PlaySquare,
  Scissors,
} from "lucide-react"
import React, { Children, ElementType, useState } from "react"
import Button from "../components/Button"
import { playlists, subscriptions } from "../data/sidebar"
import { twMerge } from "tailwind-merge"
import { useSidebarContext } from "../contexts/SidebarProvider"
import { PageHeaderFirstSection } from "./PageHeader"

type SidebarProps = {
  Icon?: ElementType
  title: string
  url: string
  src?: string
  alt?: string
}

type SidebarItemsProps = {
  Icon?: ElementType
  title: string
  url: string
  src?: string
  alt?: string
  isActive?: boolean
  className?: string
}

type SidebarSectionProps = {
  children: React.ReactNode
  title?: string
  visibleItemCount?: number
}

function SmallSidebarItem({ Icon, title, url, src, alt }: SidebarProps) {
  return (
    <a
      href={url}
      className="py-4  flex flex-col items-center gap-1 
    rounded-lg hover:bg-[#2c2f38] whitespace-nowrap text-ellipsis"
    >
      {Icon ? (
        <Icon className="w-6 h-6 outline-none" />
      ) : (
        <img src={src} alt={alt} className="w-6 h-6 outline-none" />
      )}
      <span className="text-sm">{title}</span>
    </a>
  )
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: SidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount)

  const showExpandButton = childrenArray.length > visibleItemCount

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

  return (
    <div>
      {title && <div className="ml-4 mt-2  mb-1 font-bold">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant={"ghost"}
          className="w-full flex items-center rounded-lg gap-4 p-3
          outline-none hover:bg-[#fcdc7b]/10"
        >
          <ButtonIcon className="w-6 h-6 " />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  )
}
function LargeSidebarItem({
  Icon,
  title,
  src,
  alt,
  url,
  isActive = false,
  className,
}: SidebarItemsProps) {
  return (
    <a
      href={url}
      className={`w-full flex items-center rounded-lg 
gap-4 p-3 hover:bg-[#fcdc7b]/10 text-sm  ${
        isActive ? "font-bold bg-[#fcdc7b]/20" : undefined
      }`}
    >
      {Icon ? (
        <Icon className="w-6 h-6 outline-none" />
      ) : (
        <img src={src} alt={alt} className={twMerge("w-6 h-6", className)} />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext()

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto 
  scrollbar-hidden pb-4 flex flex-col ml-1 ${
    isLargeOpen ? "lg:hidden" : "lg:flex"
  }`}
      >
        <SmallSidebarItem title="Home" url="/" src="./home.svg" alt="home" />
        <SmallSidebarItem
          src="./shorts.svg"
          alt="shorts"
          title="Shorts"
          url="/shorts"
        />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
        <SmallSidebarItem
          src="./live.svg"
          alt="live"
          title="Tube Live"
          url="/live"
        />
      </aside>

      {isSmallOpen && (
        <div
          onClick={close}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 
          z-[999]"
        />
      )}

      <aside
        className={`w-64 lg:sticky absolute top-0 overflow-y-auto
      scrollbar-hidden pb-4 flex-col gap-2 px-2  ${
        isLargeOpen ? "lg:flex" : "hidden"
      } ${isSmallOpen ? "flex z-[999] bg-[#0e1013] max-h-screen" : "hidden"}`}
      >
        <div
          className="lg:hidden pt-4 pb-4 px-2 sticky top-0
        bg-[#0e1013]"
        >
          <PageHeaderFirstSection />
        </div>

        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            title="Home"
            src="./home.svg"
            alt="home"
            url="/home"
          />

          <LargeSidebarItem
            title="Shorts"
            src="./shorts.svg"
            alt="shorts"
            url="/shorts"
          />

          <LargeSidebarItem
            title="Subscriptions"
            Icon={Clapperboard}
            url="/shorts"
          />
        </LargeSidebarSection>
        <hr className="border-[#fcdc7b]/40" />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem title="Library" Icon={Library} url="/library" />
          <LargeSidebarItem title="History" Icon={History} url="/history" />
          <LargeSidebarItem
            title="Your videos"
            Icon={PlaySquare}
            url="/yourVideos"
          />
          <LargeSidebarItem
            title="Watch later"
            Icon={Clock}
            url="/playlist?list=WL"
          />

          <LargeSidebarItem
            title="Your clips"
            Icon={Scissors}
            url="/watchLater"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              Icon={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr className="border-[#fcdc7b]/40" />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              title={subscription.channelName}
              src={subscription.imgUrl}
              alt={subscription.channelName}
              url={`/@${subscription.id}`}
              className="rounded-full"
            />
          ))}
        </LargeSidebarSection>
        <hr className="border-[#fcdc7b]/40" />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            title="Trending"
            src="flame.png"
            alt="flame"
            url="/trending"
          />
          <LargeSidebarItem
            title="Shopping"
            src="/bag.png"
            url="/shopping"
            alt="shopping-bag"
          />
          <LargeSidebarItem
            title="Music"
            src="/music.png"
            alt="music-icon"
            url="/music"
          />
          <LargeSidebarItem
            title="Movies"
            src="/movies.png"
            alt="movies-icon"
            url="/movies-tv"
          />
          <LargeSidebarItem
            title="Live"
            src="/live.png"
            alt="live-icon"
            url="/live"
          />
          <LargeSidebarItem
            title="Gaming"
            src="/game.png"
            alt="game-pad-icon"
            url="/gaming"
          />

          <LargeSidebarItem
            title="News"
            src="/news.png"
            alt="game-pad-icon"
            url="/gaming"
          />

          <LargeSidebarItem
            title="Sports"
            src="/sports.png"
            alt="sports-icon"
            url="/sports"
          />

          <LargeSidebarItem
            title="Learning"
            src="/learning.png"
            alt="learning-icon"
            url="/learning  "
          />

          <LargeSidebarItem
            title="Fashion & Beauty"
            src="/fashion.png"
            alt="fashion-icon"
            url="/fashion-beauty"
          />

          <LargeSidebarItem
            title="Podcasts"
            src="/podcasts.png"
            alt="podcast-icon"
            url="/podcast"
          />
        </LargeSidebarSection>
      </aside>
    </>
  )
}

export default Sidebar
