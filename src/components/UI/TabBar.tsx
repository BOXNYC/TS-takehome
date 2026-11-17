import { OptionKey, TabData } from '../../Types'
import '../../styles/UI/tabBar.css'
import { useState } from 'react'

interface Props {
  tabData: TabData[]
  handleOnClick: (option: OptionKey) => void 
}

const TabBar = (props: Props) => {
  const {tabData, handleOnClick} = props
  const [activeTab, setActiveTab] = useState(tabData[0].option)
  
  // fix: removed any type and global event usage, pass option directly
  const onClick = (option: OptionKey) => {
    setActiveTab(option)
    handleOnClick(option)
  }

  return (
    <>
      <div className="tab">
        {tabData.map((tab, i) => {
            const isActive = activeTab === tab.option
            return <button
                      key= {`tab_${i}`}
                      value = {tab.option} 
                      className = {isActive ? "active" : "" }
                      onClick={() => onClick(tab.option)}>
                        {tab.label}
                      </button>
          }
        )}
      </div>
    </>
  )
} 

export default TabBar