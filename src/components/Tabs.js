import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Tcalendar from './Tcalendar';
import Statistacs from './Statistacs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 , width: 1500}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 300, }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >

        <Tab label="&nbsp;Customer list&nbsp;" {...a11yProps(0)}/>
        <Tab label="&nbsp;Training list&nbsp;" {...a11yProps(1)} />
        <Tab label="&nbsp;Calendar&nbsp;" {...a11yProps(2)} />
        <Tab label="&nbsp;Statistics&nbsp;" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}  href="/customerlist">
        <Customerlist />
      </TabPanel>
      <TabPanel value={value} index={1} href="/traininglist">
        <Traininglist />
      </TabPanel>
      <TabPanel value={value} index={2} href="/calendar">
        <Tcalendar />
      </TabPanel>
      <TabPanel value={value} index={3} href="/statistics">
        <Statistacs />
      </TabPanel>

    </Box>
  );
}
