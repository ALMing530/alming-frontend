 export interface Post {
    id: number;
    title: string;
    oringin: string;
    fomat: string;
    postType: number;
    visits: number;
    createTime: string;
    updateTime: string;
    wordCount: number;
  }
  export interface Word{
    id: number;
    en: string;
    cn: string;
    familiar: number;
  }