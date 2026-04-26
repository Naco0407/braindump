export interface GlobeMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: 'person' | 'company' | 'place';
  description: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'company';
  group: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  label: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  color: string;
  height: number;
  summary: string;
  year: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  category: 'person' | 'company' | 'event' | 'publication';
}

export const globeMarkers: GlobeMarker[] = [
  { id: 'g1', lat: 35.6762, lng: 139.6503, label: 'Tokyo', type: 'place', description: 'ソニー、トヨタの本社所在地' },
  { id: 'g2', lat: 37.7749, lng: -122.4194, label: 'San Francisco', type: 'company', description: 'OpenAI, Anthropic' },
  { id: 'g3', lat: 51.5074, lng: -0.1278, label: 'London', type: 'place', description: 'DeepMindの拠点' },
  { id: 'g4', lat: 47.6062, lng: -122.3321, label: 'Seattle', type: 'company', description: 'Amazon, Microsoft' },
  { id: 'g5', lat: 37.3861, lng: -122.0839, label: 'Mountain View', type: 'company', description: 'Google本社' },
  { id: 'g6', lat: 48.8566, lng: 2.3522, label: 'Paris', type: 'person', description: 'Yann LeCun' },
  { id: 'g7', lat: 43.6532, lng: -79.3832, label: 'Toronto', type: 'person', description: 'Geoffrey Hinton' },
  { id: 'g8', lat: 45.5017, lng: -73.5673, label: 'Montreal', type: 'person', description: 'Yoshua Bengio' },
  { id: 'g9', lat: 31.2304, lng: 121.4737, label: 'Shanghai', type: 'place', description: 'AI研究拠点' },
  { id: 'g10', lat: 52.5200, lng: 13.4050, label: 'Berlin', type: 'place', description: 'European AI hub' },
  { id: 'g11', lat: 37.5665, lng: 126.9780, label: 'Seoul', type: 'company', description: 'Samsung AI Center' },
  { id: 'g12', lat: 1.3521, lng: 103.8198, label: 'Singapore', type: 'place', description: 'AI Govテックの先進地' },
];

export const networkNodes: NetworkNode[] = [
  { id: 'n1', label: 'Geoffrey Hinton', type: 'person', group: 1 },
  { id: 'n2', label: 'Yann LeCun', type: 'person', group: 1 },
  { id: 'n3', label: 'Yoshua Bengio', type: 'person', group: 1 },
  { id: 'n4', label: 'Ilya Sutskever', type: 'person', group: 2 },
  { id: 'n5', label: 'Dario Amodei', type: 'person', group: 3 },
  { id: 'n6', label: 'Sam Altman', type: 'person', group: 2 },
  { id: 'n7', label: 'Demis Hassabis', type: 'person', group: 4 },
  { id: 'n8', label: 'Google', type: 'company', group: 4 },
  { id: 'n9', label: 'OpenAI', type: 'company', group: 2 },
  { id: 'n10', label: 'Anthropic', type: 'company', group: 3 },
  { id: 'n11', label: 'DeepMind', type: 'company', group: 4 },
  { id: 'n12', label: 'Meta AI', type: 'company', group: 5 },
  { id: 'n13', label: 'Andrej Karpathy', type: 'person', group: 2 },
  { id: 'n14', label: 'Daniela Amodei', type: 'person', group: 3 },
];

export const networkLinks: NetworkLink[] = [
  { source: 'n1', target: 'n4', label: '指導' },
  { source: 'n1', target: 'n8', label: '所属' },
  { source: 'n2', target: 'n12', label: 'Chief AI Scientist' },
  { source: 'n3', target: 'n1', label: '共同研究' },
  { source: 'n4', target: 'n9', label: '共同創業' },
  { source: 'n4', target: 'n1', label: '師弟' },
  { source: 'n5', target: 'n10', label: 'CEO' },
  { source: 'n5', target: 'n9', label: '元VP' },
  { source: 'n6', target: 'n9', label: 'CEO' },
  { source: 'n7', target: 'n11', label: 'CEO' },
  { source: 'n11', target: 'n8', label: '子会社' },
  { source: 'n13', target: 'n9', label: '元所属' },
  { source: 'n13', target: 'n4', label: '同僚' },
  { source: 'n14', target: 'n10', label: 'President' },
  { source: 'n14', target: 'n5', label: '兄妹' },
];

export const books: Book[] = [
  { id: 'b1', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', color: '#4de1f2', height: 220, summary: '人間の二つの思考システムについて', year: 2011 },
  { id: 'b2', title: 'The Alignment Problem', author: 'Brian Christian', color: '#a78bfa', height: 200, summary: 'AIアラインメント問題の全体像', year: 2020 },
  { id: 'b3', title: 'Superintelligence', author: 'Nick Bostrom', color: '#f472b6', height: 210, summary: '超知能のリスクと対策', year: 2014 },
  { id: 'b4', title: 'Life 3.0', author: 'Max Tegmark', color: '#f2a94d', height: 195, summary: 'AIが人類の未来に与える影響', year: 2017 },
  { id: 'b5', title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', color: '#4de1f2', height: 240, summary: '深層学習の教科書', year: 2016 },
  { id: 'b6', title: 'The Master Algorithm', author: 'Pedro Domingos', color: '#a78bfa', height: 185, summary: '機械学習の五つの流派', year: 2015 },
  { id: 'b7', title: 'Human Compatible', author: 'Stuart Russell', color: '#f472b6', height: 205, summary: '人間と共存するAI設計', year: 2019 },
  { id: 'b8', title: 'Architects of Intelligence', author: 'Martin Ford', color: '#f2a94d', height: 215, summary: 'AI研究者23人へのインタビュー', year: 2018 },
  { id: 'b9', title: 'The Age of AI', author: 'Kissinger, Schmidt, Huttenlocher', color: '#4de1f2', height: 190, summary: 'AIと新しい世界秩序', year: 2021 },
  { id: 'b10', title: 'Atlas of AI', author: 'Kate Crawford', color: '#f472b6', height: 200, summary: 'AIの政治・環境的コスト', year: 2021 },
];

export const timelineEvents: TimelineEvent[] = [
  { id: 't1', date: '1943', year: 1943, title: 'McCulloch-Pitts ニューロンモデル', description: '人工ニューロンの数学的モデルが提案される', category: 'event' },
  { id: 't2', date: '1956', year: 1956, title: 'ダートマス会議', description: '「人工知能」という用語が初めて使われた歴史的会議', category: 'event' },
  { id: 't3', date: '1986', year: 1986, title: '誤差逆伝播法の普及', description: 'Hinton, Rumelhart, Williamsが誤差逆伝播法を発表', category: 'publication' },
  { id: 't4', date: '1997', year: 1997, title: 'Deep Blueがカスパロフに勝利', description: 'IBMのDeep Blueがチェス世界チャンピオンに勝利', category: 'event' },
  { id: 't5', date: '2012', year: 2012, title: 'AlexNet', description: 'ImageNetコンペでディープラーニングが圧勝', category: 'publication' },
  { id: 't6', date: '2014', year: 2014, title: 'GAN発表', description: 'Ian Goodfellowが敵対的生成ネットワークを提案', category: 'publication' },
  { id: 't7', date: '2015', year: 2015, title: 'OpenAI設立', description: 'Sam Altmanらが非営利AI研究所を設立', category: 'company' },
  { id: 't8', date: '2016', year: 2016, title: 'AlphaGoがイ・セドルに勝利', description: 'DeepMindのAlphaGoが囲碁の世界トップ棋士に勝利', category: 'event' },
  { id: 't9', date: '2017', year: 2017, title: 'Attention Is All You Need', description: 'Transformerアーキテクチャが発表される', category: 'publication' },
  { id: 't10', date: '2020', year: 2020, title: 'GPT-3', description: '1750億パラメータのモデルが自然言語処理に革命', category: 'publication' },
  { id: 't11', date: '2021', year: 2021, title: 'Anthropic設立', description: 'Dario AmodeiらがAI安全性研究企業を設立', category: 'company' },
  { id: 't12', date: '2022', year: 2022, title: 'ChatGPT公開', description: '一般公開され2ヶ月で1億ユーザーを突破', category: 'event' },
  { id: 't13', date: '2023', year: 2023, title: 'GPT-4', description: 'マルチモーダルAI時代の幕開け', category: 'publication' },
  { id: 't14', date: '2024', year: 2024, title: 'Claude 3, Gemini, etc.', description: 'フロンティアモデルの競争激化', category: 'event' },
];
