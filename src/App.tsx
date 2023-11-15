import { useState } from "react"
import { categories, videos } from "./data/home"
import CategoryPills from "./layouts/CategoryPills"
import PageHeader from "./layouts/PageHeader"
import VideoGridItem from "./components/VideoGridItem"
import Sidebar from "./layouts/Sidebar"
import SidebarProvider from "./contexts/SidebarProvider"

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />

        <div
          className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto 
      "
        >
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4 ">
            <div
              className="sticky bg-[#0e1013] top-0 z-10 pb-4 
          "
            >
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
