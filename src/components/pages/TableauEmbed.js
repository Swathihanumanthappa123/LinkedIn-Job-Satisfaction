import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const TableauEmbed = ({ onBackClick }) => {
  useEffect(() => {
    const adjustVizSize = () => {
      const divElement = document.getElementById('viz1715111748399');
      const vizElement = divElement.getElementsByTagName('object')[0];
      if (divElement.offsetWidth > 800) {
        vizElement.style.width = '100%';
        vizElement.style.height = divElement.offsetWidth * 0.75 + 'px';
      } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = '100%';
        vizElement.style.height = divElement.offsetWidth * 0.75 + 'px';
      } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '1477px';
      }
    };

    // Adjust visualization size on window resize
    window.addEventListener('resize', adjustVizSize);
    // Adjust visualization size on component mount
    adjustVizSize();

    // Load Tableau JavaScript API
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    document.body.appendChild(scriptElement);

    return () => {
      window.removeEventListener('resize', adjustVizSize);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: '0 0 auto', padding: '20px' }}>
        <Button variant="light" onClick={onBackClick}>Back</Button>
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='tableauPlaceholder' id='viz1715111748399' style={{ position: 'relative' }}>
          <noscript>
            <a href='#'>
              <img
                alt='Company Info'
                src='https://public.tableau.com/static/images/BC/BCAMPJobSatisfactionProject/CompanyInfo/1_rss.png'
                style={{ border: 'none' }}
              />
            </a>
          </noscript>
          <object className='tableauViz' style={{ display: 'none' }}>
            <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
            <param name='embed_code_version' value='3' />
            <param name='site_root' value='' />
            <param name='name' value='BCAMPJobSatisfactionProject/CompanyInfo' />
            <param name='tabs' value='no' />
            <param name='toolbar' value='yes' />
            <param name='static_image' value='https://public.tableau.com/static/images/BC/BCAMPJobSatisfactionProject/CompanyInfo/1.png' />
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='yes' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
            <param name='language' value='en-US' />
            <param name='filter' value='publish=yes' />
          </object>
        </div>
      </div>
    </div>
  );
};

export default TableauEmbed;
