import { NavItem } from "../componenets/nav-item/nav-item.component";

export const sideItems : NavItem[] =[

    {
      name:'الصفحة الرئيسية',
      icon:'fe fe-grid',
      routing:'/',
      isCollapsed:true,
      isBar:false ,
      queryParams:'',
      requiredRole:'employee'
    },
    {
      name:'المتابعة',
      icon:'',
      routing:'',
      isCollapsed:true,
      isBar:true,
      requiredRole:'employee',
      queryParams:'',
     },
    {
      name:'المتابعات غير المكتملة',
      icon:'fe-menu',
      routing:'/tracks/uncompleted',
      isCollapsed:false,
      isBar:false,
      requiredRole:'employee',
      queryParams:'',
    },
    {
      name:'عمليات المتابعة',
      icon:'fe-flag',
      routing:'/tracks',
      isCollapsed:false,
      isBar:false,
      requiredRole:'employee',  
      queryParams:'',
    },
    {
      name:'أنواع المشاريع',
      icon:'',
      routing:'',
      isCollapsed:false,
      isBar:true,
      requiredRole:'planner',
      queryParams:'',
    },
    {
      name:'استعراض أنواع المشاريع',
      icon:'fe-map',
      routing:'/types',
      isCollapsed:false,
      isBar:false,
      requiredRole:'employee',
      queryParams:'',
    },
    {
      name:'إضافة نوع جديد',
      icon:'fe-edit-2',
      routing:'/types/create',
      isCollapsed:false,
      isBar:false,
      requiredRole:'planner',
      queryParams:'',
    },
    {
      name:'الجهات الطارحة',
      icon:'',
      routing:'',
      isCollapsed:false,
      isBar:true,
      requiredRole:'planner',
      queryParams:'',
    },
    {
      name:'استعراض الجهات الطارحة',
      icon:'fe-map',
      routing:'/customers',
      isCollapsed:false,
      isBar:false,
      requiredRole:'employee',
      queryParams:'',
    },
    {
      name:'إضافة جهة طارحة',
      icon:'fe-edit-2',
      routing:'/customers/create',
      isCollapsed:false,
      isBar:false,
      requiredRole:'planner',
      queryParams:'',
    },
    {
      name:'إدارة المشاريع',
      icon:'',
      routing:'',
      isCollapsed:false,
      isBar:true,
      requiredRole:'employee',
      queryParams:''
    }
    ,
    {
      name:'طرح مشروع',
      icon:'fe-plus',
      routing:'/projects/create',
      isCollapsed:false,
      isBar:false,
      queryParams:'',
      requiredRole:'employee'
    },
    {
      name:'استعراض المشاريع',
      icon:'fe-map',
      routing:'/projects',
      queryParams:"{ listType: 'all'}",
      isCollapsed:false,
      isBar:false,
      requiredRole:'scientific-deputy'
    },
    {
      name:'المشاريع التي أدريرها',
      icon:'fe-edit-2',
      routing:'/customers/create',
      isCollapsed:false,
      isBar:false,
      queryParams:"{ listType: 'managed'}",
      requiredRole:'planner'
    },
    {
      name:'المشاريع التي أرأسها',
      icon:'fe-edit-2',
      routing:'/customers/create',
      isCollapsed:false,
      isBar:false,
      queryParams:"{ listType: 'leaded'}",
      requiredRole:'planner'
    },
    {
      name:'العمل',
      icon:'',
      routing:'',
      isCollapsed:false,
      isBar:true,
      requiredRole:'employee',
      queryParams:''
    }
    ,
    {
      name:'استعراض مساهماتي',
      icon:'fe-plus',
      routing:'/projects/create',
      isCollapsed:false,
      isBar:false,
      queryParams:'',
      requiredRole:'employee'
    },
    {
      name:'ملفي الشخصي',
      icon:'fe-map',
      routing:'/projects',
      queryParams:"{ listType: 'all'}",
      isCollapsed:false,
      isBar:false,
      requiredRole:'employee'
    },
    
    

  ]