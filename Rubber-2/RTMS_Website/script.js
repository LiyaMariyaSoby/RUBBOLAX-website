const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
document.getElementById('enquiry-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=encodeURIComponent('RTMS product enquiry — '+(f.get('interest')||'General'));const body=encodeURIComponent(`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone')}\nCompany: ${f.get('company')}\nInterest: ${f.get('interest')}\n\nMessage:\n${f.get('message')}`);document.getElementById('form-note').textContent='Your email app should open with the enquiry prepared. Please send it to complete your enquiry.';window.location.href=`mailto:rubbolax@outlook.com?subject=${subject}&body=${body}`;});

// Sensor detail panels: available by click/tap and keyboard activation.
const sensorDetails={
  ultrasonic:{
    title:'Ultrasonic liquid-level sensing',category:'LATEX COLLECTION',icon:'⌁',
    description:'Mounted above the latex container, the ultrasonic sensor array continuously measures real-time depth variations as latex collects in the cup.',
    purpose:'Latex level and changes in collection-cup depth. The RTMS design uses these readings for proactive overflow-alert logic and to help prevent product loss.'
  },
  moisture:{
    title:'Capacitive subsoil moisture detection',category:'SOIL CONDITIONS',icon:'◉',
    description:'The capacitive moisture sensor is deployed deep within the primary root-radius zone to track localized groundwater availability around the tree.',
    purpose:'Moisture conditions in the root zone. The presentation describes these readings as input for targeted, automated drip-irrigation loops.'
  },
  temperature:{
    title:'Ambient temperature sensing',category:'TREE MICROCLIMATE',icon:'☀',
    description:'The temperature sensor monitors localized air temperature around the rubber tree and records changes in the surrounding microclimate.',
    purpose:'Ambient temperature trends can be considered alongside latex collection and other field readings to understand changing plantation conditions.'
  },
  humidity:{
    title:'Relative humidity sensing',category:'TREE MICROCLIMATE',icon:'◌',
    description:'The humidity sensor tracks relative humidity around the tree, helping capture changes in moisture levels in the surrounding air.',
    purpose:'Relative humidity readings provide a separate microclimate measure that can be reviewed alongside temperature and latex-flow observations.'
  },
  npk:{
    title:'3-probe advanced NPK soil matrix sensor',category:'SOIL NUTRIENTS',icon:'✳',
    description:'The three-probe NPK sensor tracks active Nitrogen, Phosphorus and Potassium values in the soil.',
    purpose:'The soil’s N, P and K values, supporting precision-farming metrics and helping identify where fertilizer use can be better targeted.'
  },
  weight:{
    title:'Microscale weight measurement',category:'LATEX COLLECTION',icon:'↕',
    description:'The RTMS weight-measurement approach tracks pressure changes in the collection cup as latex fills it.',
    purpose:'Changes in latex accumulation and cup load, providing a weight-related measurement alongside the liquid-level reading.'
  }
};
const sensorBackdrop=document.getElementById('sensor-dialog');
const sensorTitle=document.getElementById('sensor-dialog-title');
const sensorDescription=document.getElementById('sensor-dialog-description');
const sensorPurpose=document.getElementById('sensor-dialog-purpose');
const sensorIcon=document.getElementById('sensor-dialog-icon');
const sensorCategory=document.getElementById('sensor-dialog-category');
const sensorClose=sensorBackdrop.querySelector('.sensor-dialog-close');
let lastSensorTrigger=null;
function closeSensorDialog(){
  sensorBackdrop.classList.remove('open');
  sensorBackdrop.setAttribute('aria-hidden','true');
  document.body.classList.remove('dialog-open');
  if(lastSensorTrigger) lastSensorTrigger.focus();
}
function openSensorDialog(key,trigger){
  const detail=sensorDetails[key];
  if(!detail) return;
  lastSensorTrigger=trigger;
  sensorTitle.textContent=detail.title;
  sensorDescription.textContent=detail.description;
  sensorPurpose.textContent=detail.purpose;
  sensorIcon.textContent=detail.icon;
  sensorCategory.textContent=detail.category;
  sensorBackdrop.classList.add('open');
  sensorBackdrop.setAttribute('aria-hidden','false');
  document.body.classList.add('dialog-open');
  sensorClose.focus();
}
document.querySelectorAll('.sensor-card').forEach(card=>{
  card.addEventListener('click',()=>openSensorDialog(card.dataset.sensor,card));
});
sensorClose.addEventListener('click',closeSensorDialog);
sensorBackdrop.addEventListener('click',event=>{
  if(event.target===sensorBackdrop) closeSensorDialog();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && sensorBackdrop.classList.contains('open')) closeSensorDialog();
});
