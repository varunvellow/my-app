import * as React from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import Appbar from './appbar'
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { items, positions } from '../src/common/common'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Grid, GridColumn as Column, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { process  } from "@progress/kendo-data-query";
import { Notification } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';



function App() {

  const [expanded, setExpanded] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState(items.findIndex(x => x.selected === true));
  const [selected, setSelected] = React.useState(0);
  const [selectedInner, setSelectedInner] = React.useState(0);
  const [success, setSuccess] = React.useState(false);


  const [dataState, setDataState] = React.useState({skip: 0, take: 10});
  const [result, setResult] = React.useState(process(positions, dataState))

  const [positionDetails, setPositionDetails] = React.useState(positions[0])


  const handleClick = () => {
    setExpanded(prevState => !prevState);
  };

  const handleSelect = (ev, item) => {
    setSelectedId(ev.itemIndex);
    // setExpanded(false);
    console.log('ev', ev);
  };

  const handleSelectTab = e => {
    setSelected(e.selected);
  };

  const handleSelectInnerTab = e => {
    setSelectedInner(e.selected);
  };

  const booleanCell = props => {
    return (
      <td>{props.dataItem && props.dataItem.status === 'true' ? <Button onClick={() => console.log('clicked')}>More Info</Button> : 'failed'}</td>
    )
  }

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(positions, event.dataState))
    console.log('ev', event);
  }
  
  const rowClick = (event) => {
    setPositionDetails(event.dataItem)
    console.log('ev', event);
  }

  const onBtnClick = () => {
    setSuccess(true)
    console.log('clicked')
  }

  return (
    <div className="App">
      <div className='Navbar'>
        <Appbar />
      </div>
      <div className='container'>
        <div className='sidebar'>
          <Drawer className='sidebar' expanded={expanded} position={'start'} mode={'push'} mini={true} items={items.map((item, index) => ({ ...item,
            selected: index === selectedId
            }))} onSelect={handleSelect}>
              <DrawerContent>
                <button className="k-button" onClick={handleClick}>
                  {expanded ? 'collapse' : 'Expand'}
                </button>
                <div className='resource'>
                  <p style={{fontSize: '30px'}}>Positions</p>
                  <TabStrip selected={selected} onSelect={handleSelectTab}>
                    <TabStripTab title="Tab 1 Title">
                      <div className='table_container'>
                      <div className='left_table'>
                        <Grid
                          data={{data: result.data}}
                          pageable={true}
                          // filterable={true}
                          sortable={true}
                          onDataStateChange={onDataStateChange}
                          onRowClick={rowClick}
                          total={positions.length}
                          {...dataState}
                        >
                          <GridColumn field='position' title='PositionName' />
                          <GridColumn field='company' title='Compny Name' />
                          <GridColumn field='job' title='job category' />
                          <GridColumn field='status' title='status' cell={booleanCell}/>
                        </Grid>
                        <Fade>
                        {success && 
                          <Notification
                            type={{
                              style: "success",
                              icon: true,
                            }}
                            closable={true}
                            onClose={() => setSuccess(false)}
                          >
                            <span>Your data has been saved.</span>
                          </Notification>
                        }
                        </Fade>
                      </div>
                      <div className='table_resource'>
                        <p style={{fontSize: '16px'}}>{positionDetails.position}</p><br />
                        <TabStrip selected={selectedInner} onSelect={handleSelectInnerTab}>
                          <TabStripTab title="Position">
                            <p>psoition</p>
                            <Button onClick={onBtnClick} primary={true}>Go to Resume</Button>
                          </TabStripTab>
                          <TabStripTab title="ellowscreening">
                            <p>ellow screening</p>
                          </TabStripTab>
                        </TabStrip>
                      </div>
                      </div>
                    </TabStripTab>
                    <TabStripTab title="Tab 2 Title">
                      <p>Tab 2 Content</p>
                    </TabStripTab>
                    <TabStripTab title="Tab 3 Title">
                      <p>Tab 3 Content</p>
                    </TabStripTab>

                  </TabStrip>
                </div>
              </DrawerContent>
          </Drawer>
          </div>
      </div>
    </div>
  );
}

export default App;
