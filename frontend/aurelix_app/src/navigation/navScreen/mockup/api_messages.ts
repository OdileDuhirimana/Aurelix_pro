// Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  phone?: string;
  title?: string;
  company?: string;
  userType?: 'investor' | 'entrepreneur';
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  participantId: string; // The other user's ID
  participantName: string; // The other user's name
  participantAvatar: string; // The other user's avatar
  participantType?: 'investor' | 'entrepreneur' | 'business';
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
    read: boolean;
  };
  unreadCount: number;
}

// Mock data
const users: User[] = [
  {
    id: 'currentUser',
    name: 'You',
    avatar: 'https://s3-alpha-sig.figma.com/img/4b07/3cce/73f6c12d8d50448c6c5457d2dca5a5c7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NdDLaM-KXxKx2ayfOTbHlAW0Nig2AB2xcqb~uFVxpvUQNY0XOAFLYXFI4kCusWxDWK1v1xZ~GSIjKNSju1pAxhlB2IKtE6ulVii~D60-QVaMzrO2IKQa6~E4QsvCiQq1D4hBT8B3TLzRPNEc79kjcOdNOYu6s81NMqbSxACKzxS0z-7iEQQZ6WaFr8lPrm0E5sThoIBo3DcZbJeqhwPdy10-AqO26A--U5Z7muI-ktPhd7gc6-N1GfRTNmgnuu44H3dsS7-ozct1qOkiwXVi9Kezq5ZagFll8P4VniJKnfiqU69zbHZdDmHPULw1MHNf81xZQBWlwjLztCHm0MR~EQ__',
    email: 'you@example.com',
    title: 'Founder',
    company: 'Canaberra',
    userType: 'entrepreneur' // Default user type
  },
  {
    id: 'user1',
    name: 'John Smith',
    avatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
    email: 'john@example.com',
    title: 'Investor',
    company: 'Venture Capital Inc.',
    userType: 'investor'
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    avatar: 'https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gCR9jdLoARurFAiwjBgL~yZa0IBpjfPiUWtRf9M-JVfDdAnwqBN-l~YTowXzyuHJU~uE~iM56nsp9U1DOVgvrZft-AZCINMH1B2HLuwGXl4oBgludrKOf5lcLW5Rwo09EQWwC2wdBaOlLXiAiNTGNmGCnQlpzTWaR1V21Ud54Xlqr-BpF8vP-roLbWItoYLGfwPpK86mzLEQ-wwN9CzJ9ZNnHwByyBK1IquWB5tmsEemLoG~wfldM3Ijn5awxFmkLplgN2KgDJwv9Q16QxTYnaZAaz0gp2FThJ89HB5X7CPKbQyf4eHlQEDugZvR0ph1OxCxnGb9fn2mMRByasslMw__',
    email: 'sarah@example.com',
    title: 'Angel Investor',
    company: 'Angel Group',
    userType: 'investor'
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    avatar: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
    email: 'michael@example.com',
    title: 'Investment Manager',
    company: 'Growth Fund',
    userType: 'investor'
  },
  {
    id: 'user4',
    name: 'Mark Robinson',
    avatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
    email: 'mark@example.com',
    title: 'Investor',
    company: 'Robinson Investments',
    userType: 'investor'
  }
];

// Businesses for investor view
const businesses: Business[] = [
  {
    id: 'business1',
    name: 'Canaberra',
    logo: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
    description: 'Innovative solutions for Agriculture',
    industry: 'Agriculture'
  },
  {
    id: 'business2',
    name: 'Bralirwa',
    logo: 'https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gCR9jdLoARurFAiwjBgL~yZa0IBpjfPiUWtRf9M-JVfDdAnwqBN-l~YTowXzyuHJU~uE~iM56nsp9U1DOVgvrZft-AZCINMH1B2HLuwGXl4oBgludrKOf5lcLW5Rwo09EQWwC2wdBaOlLXiAiNTGNmGCnQlpzTWaR1V21Ud54Xlqr-BpF8vP-roLbWItoYLGfwPpK86mzLEQ-wwN9CzJ9ZNnHwByyBK1IquWB5tmsEemLoG~wfldM3Ijn5awxFmkLplgN2KgDJwv9Q16QxTYnaZAaz0gp2FThJ89HB5X7CPKbQyf4eHlQEDugZvR0ph1OxCxnGb9fn2mMRByasslMw__',
    description: 'Beverage production and distribution',
    industry: 'Food & Beverage'
  },
  {
    id: 'business3',
    name: 'Rwanda Coffee',
    logo: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
    description: 'Premium coffee production and export',
    industry: 'Agriculture'
  },
  {
    id: 'business4',
    name: 'Equity',
    logo: 'https://s3-alpha-sig.figma.com/img/4b07/3cce/73f6c12d8d50448c6c5457d2dca5a5c7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NdDLaM-KXxKx2ayfOTbHlAW0Nig2AB2xcqb~uFVxpvUQNY0XOAFLYXFI4kCusWxDWK1v1xZ~GSIjKNSju1pAxhlB2IKtE6ulVii~D60-QVaMzrO2IKQa6~E4QsvCiQq1D4hBT8B3TLzRPNEc79kjcOdNOYu6s81NMqbSxACKzxS0z-7iEQQZ6WaFr8lPrm0E5sThoIBo3DcZbJeqhwPdy10-AqO26A--U5Z7muI-ktPhd7gc6-N1GfRTNmgnuu44H3dsS7-ozct1qOkiwXVi9Kezq5ZagFll8P4VniJKnfiqU69zbHZdDmHPULw1MHNf81xZQBWlwjLztCHm0MR~EQ__',
    description: 'Financial services and banking',
    industry: 'Finance'
  },
  {
    id: 'business5',
    name: 'MediConnect',
    logo: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
    description: 'Healthcare technology solutions',
    industry: 'Healthcare'
  }
];

// Entrepreneur conversations (with investors)
const entrepreneurConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['currentUser', 'user1'],
    participantId: 'user1',
    participantName: 'John Smith',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
    participantType: 'investor',
    lastMessage: {
      content: 'I\'m interested in your startup. Can we schedule a call?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      senderId: 'user1',
      read: false
    },
    unreadCount: 1
  },
  {
    id: 'conv2',
    participants: ['currentUser', 'user2'],
    participantId: 'user2',
    participantName: 'Sarah Johnson',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gCR9jdLoARurFAiwjBgL~yZa0IBpjfPiUWtRf9M-JVfDdAnwqBN-l~YTowXzyuHJU~uE~iM56nsp9U1DOVgvrZft-AZCINMH1B2HLuwGXl4oBgludrKOf5lcLW5Rwo09EQWwC2wdBaOlLXiAiNTGNmGCnQlpzTWaR1V21Ud54Xlqr-BpF8vP-roLbWItoYLGfwPpK86mzLEQ-wwN9CzJ9ZNnHwByyBK1IquWB5tmsEemLoG~wfldM3Ijn5awxFmkLplgN2KgDJwv9Q16QxTYnaZAaz0gp2FThJ89HB5X7CPKbQyf4eHlQEDugZvR0ph1OxCxnGb9fn2mMRByasslMw__',
    participantType: 'investor',
    lastMessage: {
      content: 'Thanks for sending your pitch deck. I\'ll review it and get back to you.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      senderId: 'user2',
      read: true
    },
    unreadCount: 0
  },
  {
    id: 'conv3',
    participants: ['currentUser', 'user3'],
    participantId: 'user3',
    participantName: 'Michael Chen',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
    participantType: 'investor',
    lastMessage: {
      content: 'Let\'s discuss your financial projections in more detail.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      senderId: 'currentUser',
      read: true
    },
    unreadCount: 0
  },
  {
    id: 'conv4',
    participants: ['currentUser', 'user4'],
    participantId: 'user4',
    participantName: 'Mark Robinson',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
    participantType: 'investor',
    lastMessage: {
      content: 'Yes, I\'m interested in Agriculture field and I have been searching an agriculture related startup.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      senderId: 'user4',
      read: true
    },
    unreadCount: 0
  }
];

// Investor conversations (with businesses)
const investorConversations: Conversation[] = [
  {
    id: 'inv-conv1',
    participants: ['currentUser', 'business1'],
    participantId: 'business1',
    participantName: 'Canaberra',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
    participantType: 'business',
    lastMessage: {
      content: 'Thank you, for your interest in us...',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      senderId: 'business1',
      read: false
    },
    unreadCount: 2
  },
  {
    id: 'inv-conv2',
    participants: ['currentUser', 'business2'],
    participantId: 'business2',
    participantName: 'Bralirwa',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gCR9jdLoARurFAiwjBgL~yZa0IBpjfPiUWtRf9M-JVfDdAnwqBN-l~YTowXzyuHJU~uE~iM56nsp9U1DOVgvrZft-AZCINMH1B2HLuwGXl4oBgludrKOf5lcLW5Rwo09EQWwC2wdBaOlLXiAiNTGNmGCnQlpzTWaR1V21Ud54Xlqr-BpF8vP-roLbWItoYLGfwPpK86mzLEQ-wwN9CzJ9ZNnHwByyBK1IquWB5tmsEemLoG~wfldM3Ijn5awxFmkLplgN2KgDJwv9Q16QxTYnaZAaz0gp2FThJ89HB5X7CPKbQyf4eHlQEDugZvR0ph1OxCxnGb9fn2mMRByasslMw__',
    participantType: 'business',
    lastMessage: {
      content: 'Thank you, I\'m interested in your startup...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      senderId: 'business2',
      read: true
    },
    unreadCount: 0
  },
  {
    id: 'inv-conv3',
    participants: ['currentUser', 'business3'],
    participantId: 'business3',
    participantName: 'Rwanda Coffee',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
    participantType: 'business',
    lastMessage: {
      content: 'Could you send the documents of proof',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      senderId: 'business3',
      read: true
    },
    unreadCount: 0
  },
  {
    id: 'inv-conv4',
    participants: ['currentUser', 'business4'],
    participantId: 'business4',
    participantName: 'Equity',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/4b07/3cce/73f6c12d8d50448c6c5457d2dca5a5c7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NdDLaM-KXxKx2ayfOTbHlAW0Nig2AB2xcqb~uFVxpvUQNY0XOAFLYXFI4kCusWxDWK1v1xZ~GSIjKNSju1pAxhlB2IKtE6ulVii~D60-QVaMzrO2IKQa6~E4QsvCiQq1D4hBT8B3TLzRPNEc79kjcOdNOYu6s81NMqbSxACKzxS0z-7iEQQZ6WaFr8lPrm0E5sThoIBo3DcZbJeqhwPdy10-AqO26A--U5Z7muI-ktPhd7gc6-N1GfRTNmgnuu44H3dsS7-ozct1qOkiwXVi9Kezq5ZagFll8P4VniJKnfiqU69zbHZdDmHPULw1MHNf81xZQBWlwjLztCHm0MR~EQ__',
    participantType: 'business',
    lastMessage: {
      content: 'I have attached the required documents',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      senderId: 'business4',
      read: true
    },
    unreadCount: 1
  },
  {
    id: 'inv-conv5',
    participants: ['currentUser', 'business5'],
    participantId: 'business5',
    participantName: 'MediConnect',
    participantAvatar: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
    participantType: 'business',
    lastMessage: {
      content: 'Thank you, I\'m interested in your startup...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      senderId: 'business5',
      read: true
    },
    unreadCount: 0
  }
];

// Messages for both entrepreneur and investor conversations
const messages: { [key: string]: Message[] } = {
  'conv1': [
    {
      id: 'msg1-1',
      conversationId: 'conv1',
      senderId: 'currentUser',
      receiverId: 'user1',
      content: 'Hello John, thank you for connecting!',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      status: 'read'
    },
    {
      id: 'msg1-2',
      conversationId: 'conv1',
      senderId: 'user1',
      receiverId: 'currentUser',
      content: 'Hi there! I saw your startup on Canaberra and I\'m quite impressed.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      status: 'read'
    },
    {
      id: 'msg1-3',
      conversationId: 'conv1',
      senderId: 'user1',
      receiverId: 'currentUser',
      content: 'I\'m interested in your startup. Can we schedule a call?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: 'delivered'
    }
  ],
  'conv4': [
    {
      id: 'msg4-1',
      conversationId: 'conv4',
      senderId: 'currentUser',
      receiverId: 'user4',
      content: 'Hello, My name is Ange Curtis and I have a startup called Canaberra. We are working on innovative solutions for Agriculture.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: 'read'
    },
    {
      id: 'msg4-2',
      conversationId: 'conv4',
      senderId: 'currentUser',
      receiverId: 'user4',
      content: 'I was wondering whether you are interested as an investor, as your description mentioned your interest in Agriculture.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: 'read'
    },
    {
      id: 'msg4-3',
      conversationId: 'conv4',
      senderId: 'user4',
      receiverId: 'currentUser',
      content: 'Yes, I\'m interested in Agriculture field and I have been searching an agriculture related startup. Can I get to know more about you?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: 'read'
    }
  ],
  'inv-conv1': [
    {
      id: 'inv-msg1-1',
      conversationId: 'inv-conv1',
      senderId: 'business1',
      receiverId: 'currentUser',
      content: 'Hello, My name is Ange Curtis and I have a startup called Canaberra. We are working on innovative solutions for Agriculture.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: 'read'
    },
    {
      id: 'inv-msg1-2',
      conversationId: 'inv-conv1',
      senderId: 'business1',
      receiverId: 'currentUser',
      content: 'I was wondering whether you are interested as an investor, as your description mentioned your interest in Agriculture.',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: 'read'
    },
    {
      id: 'inv-msg1-3',
      conversationId: 'inv-conv1',
      senderId: 'currentUser',
      receiverId: 'business1',
      content: 'Yes, I\'m interested in Agriculture field and I have been searching an agriculture related startup. Can I get to know more about you?',
      type: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: 'delivered'
    }
  ]
};

// Store current user type in memory since we can't use localStorage in React Native
let currentUserType: 'investor' | 'entrepreneur' = 'entrepreneur';

// Auth context to store current user type
export const getCurrentUserType = (): 'investor' | 'entrepreneur' => {
  return currentUserType;
};

export const setCurrentUserType = (userType: 'investor' | 'entrepreneur'): void => {
  currentUserType = userType;
};

// Message Service API
const messageService = {
  // Get user profile
  getUserProfile: async (userId: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if it's a business ID (for investor view)
        const business = businesses.find(b => b.id === userId);
        if (business) {
          // Convert business to user format
          const businessUser: User = {
            id: business.id,
            name: business.name,
            avatar: business.logo,
            title: business.description,
            company: business.name,
            userType: 'entrepreneur'
          };
          resolve(businessUser);
          return;
        }

        // Otherwise look for regular user
        const user = users.find(u => u.id === userId);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },

  // Get recent conversations based on user type
  getRecentConversations: async (userId: string, page = 1, limit = 10): Promise<{ conversations: Conversation[], hasMore: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userType = getCurrentUserType();
        
        // Select conversations based on user type
        const userConversations = userType === 'entrepreneur' 
          ? entrepreneurConversations 
          : investorConversations;
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedConversations = userConversations.slice(startIndex, endIndex);
        
        resolve({
          conversations: paginatedConversations,
          hasMore: endIndex < userConversations.length
        });
      }, 500);
    });
  },

  // Get conversation messages
  getConversationMessages: async (conversationId: string, options = { limit: 20, before: undefined }): Promise<{ messages: Message[], hasMore: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversationMessages = messages[conversationId] || [];
        
        // Sort messages by timestamp (oldest first)
        const sortedMessages = [...conversationMessages].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        resolve({
          messages: sortedMessages,
          hasMore: false // For simplicity, we're not implementing pagination for messages in this mock
        });
      }, 500);
    });
  },

  // Send a message
  sendMessage: async (message: Omit<Message, 'id' | 'status' | 'timestamp'>): Promise<Message> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}`,
          status: 'sent',
          timestamp: new Date().toISOString()
        };
        
        // Update messages
        if (!messages[message.conversationId]) {
          messages[message.conversationId] = [];
        }
        messages[message.conversationId].push(newMessage);
        
        // Find the right conversation collection based on conversation ID
        const isInvestorConversation = message.conversationId.startsWith('inv-');
        const conversationCollection = isInvestorConversation 
          ? investorConversations 
          : entrepreneurConversations;
        
        // Update conversation last message
        const conversation = conversationCollection.find(c => c.id === message.conversationId);
        if (conversation) {
          conversation.lastMessage = {
            content: newMessage.content,
            timestamp: newMessage.timestamp,
            senderId: newMessage.senderId,
            read: false
          };
          
          // If the message is from the other participant, increment unread count
          if (message.senderId !== 'currentUser') {
            conversation.unreadCount += 1;
          }
        }
        
        resolve(newMessage);
      }, 300);
    });
  },

  // Mark messages as read
  markMessagesAsRead: async (conversationId: string, messageIds: string[]): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversationMessages = messages[conversationId] || [];
        
        // Update message status
        conversationMessages.forEach(message => {
          if (messageIds.includes(message.id)) {
            message.status = 'read';
          }
        });
        
        // Find the right conversation collection based on conversation ID
        const isInvestorConversation = conversationId.startsWith('inv-');
        const conversationCollection = isInvestorConversation 
          ? investorConversations 
          : entrepreneurConversations;
        
        // Update conversation unread count
        const conversation = conversationCollection.find(c => c.id === conversationId);
        if (conversation) {
          conversation.unreadCount = 0;
          conversation.lastMessage.read = true;
        }
        
        resolve();
      }, 200);
    });
  },

  // Mark conversation as read
  markConversationAsRead: async (conversationId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find the right conversation collection based on conversation ID
        const isInvestorConversation = conversationId.startsWith('inv-');
        const conversationCollection = isInvestorConversation 
          ? investorConversations 
          : entrepreneurConversations;
        
        // Update conversation unread count
        const conversation = conversationCollection.find(c => c.id === conversationId);
        if (conversation) {
          conversation.unreadCount = 0;
          conversation.lastMessage.read = true;
        }
        
        // Mark all messages as read
        const conversationMessages = messages[conversationId] || [];
        conversationMessages.forEach(message => {
          if (message.receiverId === 'currentUser') {
            message.status = 'read';
          }
        });
        
        resolve();
      }, 200);
    });
  },

  // Search conversations
  searchConversations: async (query: string, userId: string): Promise<Conversation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userType = getCurrentUserType();
        
        // Select conversations based on user type
        const userConversations = userType === 'entrepreneur' 
          ? entrepreneurConversations 
          : investorConversations;
        
        const results = userConversations.filter(conv => 
          conv.participantName.toLowerCase().includes(query.toLowerCase()) ||
          conv.lastMessage.content.toLowerCase().includes(query.toLowerCase())
        );
        
        resolve(results);
      }, 300);
    });
  },

  // Toggle user type (for demo purposes)
  toggleUserType: async (): Promise<{ userType: 'investor' | 'entrepreneur' }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentType = getCurrentUserType();
        const newType = currentType === 'entrepreneur' ? 'investor' : 'entrepreneur';
        setCurrentUserType(newType);
        resolve({ userType: newType });
      }, 100);
    });
  },

  // Get current user type
  getUserType: async (): Promise<{ userType: 'investor' | 'entrepreneur' }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ userType: getCurrentUserType() });
      }, 100);
    });
  }
};

// WebSocket Service for real-time messaging
export const WebSocketService = {
  callbacks: new Map<string, Function>(),
  typingCallbacks: new Map<string, Function>(),
  
  connect: (userId: string, messageCallback: (message: Message) => void) => {
    console.log(`WebSocket connected for user ${userId}`);
    WebSocketService.callbacks.set(userId, messageCallback);
  },
  
  disconnect: () => {
    console.log('WebSocket disconnected');
    WebSocketService.callbacks.clear();
    WebSocketService.typingCallbacks.clear();
  },
  
  sendMessage: (message: Message) => {
    // Simulate sending message to server
    console.log('Sending message via WebSocket:', message);
    
    // Simulate receiving message from server (for demo purposes)
    setTimeout(() => {
      const receiverCallback = WebSocketService.callbacks.get(message.receiverId);
      if (receiverCallback) {
        receiverCallback(message);
      }
    }, 500);
  },
  
  sendTypingIndicator: (conversationId: string, isTyping: boolean) => {
    console.log(`Typing indicator for conversation ${conversationId}: ${isTyping}`);
    
    // Simulate sending typing indicator to other participants
    const isInvestorConversation = conversationId.startsWith('inv-');
    const conversationCollection = isInvestorConversation 
      ? investorConversations 
      : entrepreneurConversations;
    
    const conversation = conversationCollection.find(c => c.id === conversationId);
    if (conversation) {
      const otherParticipantId = conversation.participants.find(p => p !== 'currentUser');
      if (otherParticipantId) {
        const typingCallback = WebSocketService.typingCallbacks.get(otherParticipantId);
        if (typingCallback) {
          typingCallback(isTyping);
        }
      }
    }
  },
  
  onTypingIndicator: (userId: string, callback: (isTyping: boolean) => void) => {
    WebSocketService.typingCallbacks.set(userId, callback);
  }
};

export default messageService;