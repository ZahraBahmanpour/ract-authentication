import { Tabs as Tabbs, Tab } from "react-bootstrap";
import TabContent from "./TabContent";
import TabHeader from "./TabHeader";
import { useSelector, useDispatch } from "react-redux";
import { activeTab, closeAllTabs } from "../../redux/features/tab/tabsSlice";
import { IoCloseSharp } from "react-icons/io5";

function Tabs() {
  const { tabs, activeKey } = useSelector((state) => state.tabs);
  const dispatch = useDispatch();
  return (
    <div style={{ width: "100%" }}>
      {tabs.length > 0 && (
        <Tabbs
          id="controlled-tab-example"
          activeKey={activeKey}
          className="mb-3"
          onSelect={(key) => dispatch(activeTab({ id: key }))}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} eventKey={tab.id} title={<TabHeader {...tab} />}>
              <TabContent {...tab} />
            </Tab>
          ))}
          <Tab
            key={"close-all"}
            eventKey={"close-all"}
            title={
              <IoCloseSharp
                className="text-danger"
                onClick={() => dispatch(closeAllTabs())}
              />
            }
          ></Tab>
        </Tabbs>
      )}
    </div>
  );
}

export default Tabs;
