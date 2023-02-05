const envMode = 'dev';

const envRun=(envMode)=>{
  switch(envMode) {
    case 'local': 
      // 로컬pc
      process.configDir='/home/bfsadm/gbranch/config/local/';
      break;
    case 'dev': 
      // 개발서버
      process.configDir='/home/bfsadm/gbranch/config/dev/';
      break;
    case 'stage':
      // 스테이징서버
      process.configDir='/home/bfsadm/gbranch/config/stage/';
      break;
    case 'prod': 
      // 운영서버
      process.configDir='/home/bfsadm/gbranch/config/prod/';
      break;
  }  
}

envRun(envMode);
