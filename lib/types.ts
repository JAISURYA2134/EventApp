export type Section =
  | 'home'
  | 'event-registration'
  | 'vision'
  | 'about-us'
  | 'profile'
  | 'attendance'
  | 'eventpass'
  | 'qrscanner'
  //about us below
  | 'vellalar-origin'
  | 'vellalar-puranas'
  | 'vellalar-gangai-maindhan'
  | 'vellalar-gangai-amman'
  | 'vellalar-migration'
  | 'vellalar-warriors'
  | 'vellalar-sangam'
  | 'vellalar-vendhar'
  | 'vellalar-vaanaa'
  | 'vellalar-magabali'
  | 'vellalar-religion'
  | 'vellalar-social'
  //home leaders below
  | 'leader-voc'
  | 'leader-pachaiyappa'
  | 'leader-muthuranga'
  | 'leader-kalingaray'
  | 'leader-marudha'
  | 'leader-chinnamalai'
  | 'leader-natesa'
  | 'leader-arkadu'
  | 'leader-lakshmanasami'
  | 'leader-vk'
  | 'leader-ramalingam'
  | 'leader-viswanathan'
  | 'leader-varadarajan'
  | 'leader-silamboli'
  | 'leader-krishnan'
  | 'leader-pollachi'
  | 'leader-coimbatore'
  | 'leader-nedunchezhiyan'
  | 'leader-anbalagan';
 ;

  export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  // add other screens if any
};
export type Card = {
  title: string;
  description: string;
  route: string;
  sectionKey: Section;
  image: any;
  buttonLabel: string;
};

