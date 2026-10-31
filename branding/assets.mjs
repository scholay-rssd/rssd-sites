import branding from './manifest.json' with {type:'json'};
export function siteBranding(siteId){
 const brand=branding[siteId];if(!brand)return null;
 const path='/site-logo.'+brand.file.split('.').pop(),suffix=brand.version?'?v='+encodeURIComponent(brand.version):'';
 const files={[path.slice(1)]:brand.file};
 if(brand.icons){files['favicon.ico']=brand.icons.ico;files['favicon-32.png']=brand.icons.png32;files['apple-touch-icon.png']=brand.icons.apple;}
 const links=brand.icons?`<link rel="icon" href="/favicon.ico${suffix}" sizes="16x16 32x32 48x48"><link rel="icon" href="/favicon-32.png${suffix}" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png${suffix}" sizes="180x180">`:`<link rel="icon" href="${path}${suffix}">`;
 return {logo:path+suffix,files,links};
}
