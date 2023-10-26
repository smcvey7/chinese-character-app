# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'chinese_pinyin'
require 'faker'
require 'securerandom'


hsk1 = ["爱", "八", "爸", "吧", "白", "百", "班", "半", "帮", "包", "杯", "北", "备", "本", "比", "边", "别", "病", "不", "菜", "茶", "差", "常", "场", "唱", "车", "吃", "出", "穿", "床", "次", "从", "错", "答", "打", "大", "蛋", "到", "道", "得", "地", "的", "等", "弟", "第", "点", "电", "店", "东", "动", "都", "读", "对", "多", "饿", "儿", "二", "饭", "方", "房", "放", "飞", "非", "分", "风", "服", "干", "高", "告", "哥", "歌", "个", "给", "跟", "工", "关", "馆", "贵", "国", "果", "过", "还", "孩", "汉", "好", "号", "喝", "和", "很", "后", "候", "花", "话", "坏", "欢", "回", "会", "火", "机", "鸡", "几", "记", "家", "假", "间", "见", "教", "叫", "觉", "姐", "介", "今", "进", "京", "净", "九", "就", "开", "看", "考", "渴", "客", "课", "口", "块", "快", "来", "老", "了", "累", "冷", "里", "两", "零", "六", "楼", "路", "妈", "马", "吗", "买", "慢", "忙", "毛", "么", "没", "妹", "门", "们", "米", "面", "名", "明", "拿", "哪", "那", "奶", "男", "南", "难", "脑", "呢", "能", "你", "年", "您", "牛", "女", "旁", "跑", "朋", "票", "七", "期", "起", "气", "汽", "前", "钱", "请", "球", "去", "热", "人", "认", "日", "肉", "三", "山", "商", "上", "少", "绍", "身", "什", "生", "师", "十", "时", "识", "事", "试", "视", "是", "手", "书", "树", "谁", "水", "睡", "说", "四", "送", "诉", "岁", "他", "她", "太", "体", "天", "条", "听", "同", "图", "外", "玩", "晚", "网", "忘", "文", "问", "我", "五", "午", "西", "息", "习", "洗", "喜", "系", "下", "先", "现", "想", "小", "校", "笑", "些", "写", "谢", "新", "星", "行", "兴", "休", "学", "样", "要", "爷", "也", "页", "一", "衣", "医", "影", "用", "友", "有", "右", "雨", "语", "元", "远", "院", "月", "再", "在", "早", "怎", "站", "找", "这", "着", "真", "正", "知", "中", "重", "住", "准", "桌", "子", "字", "走", "最", "昨", "左", "作", "坐", "做"]

hsk2 = ["啊", "安", "般", "板", "办", "饱", "报", "背", "笔", "必", "变", "便", "遍", "表", "部", "才", "参", "餐", "草", "层", "查", "长", "超", "晨", "称", "成", "楚", "处", "船", "吹", "春", "词", "带", "单", "但", "当", "倒", "灯", "低", "典", "掉", "定", "冬", "懂", "度", "短", "段", "队", "而", "发", "法", "份", "封", "复", "该", "改", "感", "刚", "更", "公", "共", "狗", "够", "故", "顾", "观", "惯", "广", "海", "喊", "合", "河", "黑", "红", "忽", "湖", "护", "划", "画", "换", "黄", "活", "或", "级", "急", "己", "计", "际", "绩", "加", "检", "件", "健", "讲", "交", "角", "饺", "脚", "接", "街", "节", "结", "借", "斤", "近", "经", "睛", "静", "久", "酒", "举", "句", "卡", "康", "靠", "科", "可", "克", "刻", "空", "哭", "筷", "拉", "蓝", "篮", "乐", "离", "礼", "理", "力", "利", "例", "脸", "练", "凉", "亮", "辆", "量", "留", "流", "旅", "绿", "论", "卖", "满", "猫", "末", "目", "鸟", "弄", "努", "爬", "怕", "排", "碰", "篇", "片", "漂", "平", "瓶", "普", "其", "骑", "千", "墙", "且", "青", "轻", "清", "情", "晴", "秋", "求", "取", "全", "确", "然", "让", "如", "入", "色", "声", "省", "实", "食", "使", "示", "市", "适", "室", "收", "受", "舒", "熟", "数", "顺", "司", "思", "算", "虽", "随", "所", "它", "态", "堂", "讨", "套", "特", "疼", "提", "题", "铁", "庭", "停", "挺", "通", "头", "推", "腿", "完", "碗", "万", "王", "往", "为", "位", "味", "喂", "温", "闻", "务", "物", "夏", "相", "响", "向", "像", "鞋", "心", "信", "姓", "须", "许", "选", "雪", "言", "颜", "眼", "阳", "养", "药", "业", "夜", "宜", "已", "以", "椅", "亿", "意", "因", "阴", "音", "银", "印", "应", "英", "迎", "永", "由", "油", "游", "又", "于", "鱼", "育", "园", "原", "愿", "越", "云", "运", "咱", "脏", "澡", "占", "照", "者", "直", "只", "纸", "钟", "周", "主", "助", "装", "自", "租", "组", "嘴", "座"] 

hsk3 = ["按", "把", "搬", "保", "被", "币", "标", "并", "播", "补", "布", "步", "材", "采", "彩", "曾", "察", "产", "厂", "朝", "吵", "衬", "城", "程", "持", "充", "初", "除", "础", "传", "创", "此", "村", "存", "达", "代", "待", "刀", "导", "底", "调", "订", "断", "顿", "烦", "反", "范", "防", "访", "啡", "费", "丰", "否", "夫", "福", "父", "付", "负", "富", "概", "赶", "敢", "格", "各", "根", "功", "姑", "古", "挂", "怪", "管", "光", "规", "哈", "害", "何", "互", "华", "化", "环", "婚", "积", "基", "及", "极", "集", "纪", "技", "济", "继", "价", "架", "坚", "简", "建", "将", "蕉", "较", "解", "界", "金", "仅", "尽", "紧", "精", "景", "磐", "境", "旧", "救", "具", "剧", "据", "决", "绝", "咖", "恐", "苦", "裤", "况", "困", "浪", "类", "李", "历", "立", "丽", "连", "联", "烈", "领", "另", "龙", "录", "乱", "落", "麻", "冒", "媒", "每", "美", "迷", "民", "命", "某", "母", "木", "内", "念", "娘", "农", "暖", "拍", "牌", "派", "判", "胖", "配", "批", "皮", "啤", "品", "评", "苹", "破", "齐", "奇", "器", "强", "桥", "巧", "切", "亲", "庆", "区", "缺", "裙", "群", "任", "仍", "容", "赛", "散", "沙", "衫", "善", "伤", "设", "社", "深", "神", "升", "胜", "失", "石", "始", "世", "式", "似", "势", "首", "输", "属", "术", "束", "双", "死", "速", "台", "谈", "汤", "糖", "甜", "跳", "痛", "突", "土", "团", "退", "望", "危", "围", "伟", "卫", "握", "屋", "武", "舞", "误", "希", "戏", "显", "险", "线", "乡", "香", "箱", "象", "消", "效", "血", "形", "幸", "性", "修", "需", "续", "宣", "训", "压", "烟", "演", "验", "羊", "义", "艺", "议", "易", "营", "赢", "泳", "优", "邮", "预", "员", "约", "杂", "造", "责", "增", "展", "张", "章", "争", "整", "证", "支", "汁", "值", "职", "止", "指", "至", "志", "制", "终", "种", "众", "猪", "注", "祝", "抓", "专", "转", "状", "追", "资", "总", "足", "族"]

hsk4 = ["阿", "矮", "案", "暗", "巴", "摆", "败", "伴", "薄", "宝", "抱", "贝", "倍", "笨", "毕", "闭", "避", "编", "辩", "冰", "兵", "擦", "财", "操", "测", "抄", "潮", "彻", "沉", "诚", "承", "迟", "尺", "冲", "虫", "抽", "窗", "纯", "刺", "粗", "促", "寸", "措", "袋", "戴", "担", "淡", "登", "敌", "递", "顶", "斗", "豆", "独", "堵", "肚", "锻", "恶", "耳", "翻", "肥", "纷", "奋", "符", "府", "腐", "妇", "附", "盖", "隔", "供", "构", "购", "骨", "固", "瓜", "官", "逛", "归", "裹", "含", "寒", "航", "毫", "厚", "乎", "呼", "户", "怀", "缓", "挥", "汇", "伙", "货", "获", "圾", "激", "即", "季", "既", "寄", "减", "渐", "江", "奖", "降", "阶", "巾", "劲", "禁", "惊", "竟", "镜", "究", "居", "局", "巨", "距", "聚", "卷", "均", "棵", "宽", "矿", "扩", "括", "垃", "辣", "郎", "雷", "泪", "厘", "俩", "炼", "良", "粮", "疗", "聊", "料", "列", "林", "临", "陆", "律", "虑", "率", "轮", "络", "码", "帽", "梦", "秘", "密", "免", "描", "摸", "模", "默", "闹", "宁", "浓", "盘", "培", "婆", "迫", "妻", "企", "浅", "穷", "趋", "趣", "圈", "权", "泉", "却", "燃", "弱", "伞", "扫", "森", "晒", "闪", "赏", "尚", "烧", "申", "甚", "诗", "施", "湿", "史", "士", "释", "守", "授", "售", "叔", "殊", "暑", "述", "刷", "帅", "松", "俗", "塑", "酸", "孙", "缩", "躺", "梯", "替", "填", "挑", "贴", "童", "统", "投", "透", "途", "脱", "袜", "弯", "微", "维", "尾", "未", "谓", "稳", "无", "吸", "席", "细", "鲜", "咸", "县", "限", "项", "销", "型", "醒", "兄", "胸", "秀", "序", "寻", "迅", "牙", "亚", "呀", "延", "严", "研", "盐", "扬", "腰", "摇", "叶", "依", "姨", "移", "遗", "疑", "译", "益", "引", "映", "勇", "幼", "余", "与", "玉", "遇", "圆", "源", "阅", "载", "赞", "则", "择", "战", "丈", "招", "召", "折", "针", "阵", "征", "政", "之", "植", "址", "质", "治", "致", "智", "置", "逐", "著", "综", "阻"]

hsk5 = ["碍", "岸", "拔", "拜", "版", "扮", "棒", "悲", "辈", "鼻", "彼", "壁", "宾", "饼", "玻", "博", "猜", "裁", "册", "叉", "插", "拆", "柴", "肠", "尝", "偿", "倡", "乘", "池", "愁", "丑", "臭", "厨", "触", "闯", "辞", "聪", "脆", "呆", "贷", "胆", "旦", "弹", "挡", "德", "丢", "冻", "洞", "毒", "堆", "吨", "盾", "朵", "躲", "尔", "乏", "罚", "繁", "返", "泛", "仿", "疯", "肤", "扶", "幅", "辅", "傅", "纲", "钢", "糕", "搞", "革", "沟", "估", "鼓", "冠", "鬼", "柜", "滚", "锅", "汗", "豪", "核", "盒", "贺", "恨", "猴", "胡", "糊", "虎", "滑", "慌", "灰", "恢", "悔", "惠", "击", "肌", "辑", "籍", "挤", "夹", "甲", "驾", "肩", "艰", "剪", "键", "郊", "胶", "戒", "届", "竞", "敬", "拒", "俱", "军", "烤", "颗", "咳", "仃", "控", "库", "款", "狂", "亏", "览", "烂", "朗", "劳", "梨", "璃", "厉", "励", "怜", "帘", "恋", "邻", "铃", "龄", "令", "漏", "逻", "骂", "漫", "矛", "贸", "貌", "煤", "眠", "秒", "敏", "摩", "漠", "幕", "奈", "耐", "偶", "陪", "赔", "喷", "盆", "披", "脾", "匹", "骗", "拼", "频", "凭", "泼", "葡", "启", "弃", "签", "欠", "枪", "抢", "悄", "敲", "瞧", "琴", "勤", "曲", "劝", "染", "扰", "绕", "忍", "扔", "荣", "绒", "软", "润", "洒", "杀", "傻", "扇", "稍", "蛇", "舍", "射", "摄", "伸", "剩", "拾", "驶", "饰", "柿", "寿", "瘦", "蔬", "鼠", "摔", "硕", "私", "搜", "肃", "宿", "碎", "损", "索", "锁", "抬", "坦", "逃", "桃", "萄", "厅", "俞", "吐", "兔", "托", "违", "唯", "委", "胃", "慰", "卧", "污", "夕", "析", "悉", "惜", "吓", "闲", "献", "详", "享", "歇", "协", "斜", "辛", "欣", "雄", "熊", "虚", "询", "押", "鸭", "厌", "艳", "央", "邀", "咬", "乙", "忆", "谊", "饮", "硬", "拥", "幽", "尤", "犹", "羽", "域", "豫", "怨", "灾", "仔", "暂", "糟", "赠", "摘", "涨", "掌", "珍", "诊", "振", "震", "挣", "织", "执", "珠", "竹", "筑", "撞", "紫", "醉", "尊", "遵"] 

hsk6 = ["挨", "傲", "罢", "榜", "傍", "胞", "暴", "爆", "奔", "逼", "扁", "拨", "波", "捕", "踩", "残", "惨", "仓", "藏", "厕", "侧", "策", "昌", "畅", "炒", "撤", "撑", "崇", "宠", "储", "串", "醋", "搭", "诞", "党", "档", "岛", "蹈", "盗", "滴", "抵", "帝", "吊", "跌", "督", "赌", "渡", "端", "蹲", "夺", "额", "恩", "番", "凡", "犯", "肺", "废", "氛", "粉", "愤", "峰", "锋", "奉", "佛", "浮", "副", "肝", "杆", "冈", "港", "稿", "攻", "宫", "巩", "贡", "孤", "谷", "股", "刮", "拐", "贯", "轨", "跪", "憾", "耗", "狠", "横", "衡", "宏", "洪", "壶", "幻", "患", "皇", "辉", "毁", "绘", "慧", "昏", "混", "吉", "疾", "佳", "嘉", "尖", "监", "捡", "剑", "舰", "践", "鉴", "箭", "酱", "骄", "焦", "揭", "杰", "洁", "截", "井", "径", "纠", "捐", "菌", "刊", "抗", "扣", "酷", "跨", "阔", "啦", "赖", "栏", "懒", "牢", "梁", "谅", "裂", "灵", "炉", "露", "略", "嘛", "埋", "麦", "馒", "盲", "梅", "蒙", "盟", "猛", "棉", "妙", "灭", "膜", "磨", "墨", "谋", "墓", "纳", "泥", "扭", "怒", "诺", "盼", "泡", "炮", "偏", "贫", "聘", "屏", "坡", "扑", "铺", "欺", "旗", "恰", "迁", "牵", "铅", "谦", "潜", "歉", "茄", "侵", "倾", "渠", "券", "融", "乳", "若", "塞", "喪", "勺", "舌", "涉", "审", "牲", "圣", "盛", "薯", "爽", "税", "寺", "苏", "素", "塔", "踏", "叹", "探", "趟", "掏", "踢", "添", "田", "铜", "徒", "吞", "拖", "挖", "娃", "哇", "湾", "顽", "亡", "旺", "威", "乌", "伍", "悟", "牺", "嫌", "陷", "祥", "晓", "胁", "谐", "械", "薪", "凶", "袖", "绪", "悬", "旋", "循", "讯", "炎", "沿", "宴", "洋", "仰", "氧", "耀", "野", "液", "仪", "异", "隐", "忧", "娱", "愉", "予", "宇", "欲", "誉", "援", "缘", "跃", "晕", "允", "遭", "扎", "炸", "宅", "债", "账", "障", "哲", "镇", "症", "枝", "殖", "忠", "肿", "粥", "诸", "煮", "驻", "柱", "赚", "庄", "壮", "捉", "咨", "宗", "纵", "奏", "祖", "钻", "罪"] 

hsk_above = ["哎", "哀", "癌", "蔼", "艾", "唉", "隘", "昂", "凹", "熬", "奥", "澳", "扒", "叭", "芭", "靶", "坝", "霸", "掰", "柏", "扳", "颁", "斑", "拌", "瓣", "邦", "绑", "谤", "磅", "镑", "煲", "堡", "豹", "曝", "卑", "碑", "狈", "惫", "朋", "绷", "蹦", "用", "毙", "痹", "碧", "蔽", "弊", "臂", "鞭", "贬", "辨", "辫", "飙", "憋", "彬", "滨", "缤", "丙", "秉", "柄", "剥", "伯", "驳", "泊", "勃", "舶", "脖", "搏", "膊", "卜", "哺", "怖", "睬", "惭", "灿", "苍", "沧", "舱", "糙", "曹", "槽", "蹭", "岔", "刹", "诧", "掺", "搀", "馋", "禅", "缠", "铲", "阐", "颤", "猖", "娼", "敞", "钞", "巢", "嘲", "扯", "臣", "尘", "辰", "陈", "趁", "呈", "惩", "澄", "橙", "逞", "秤", "痴", "弛", "驰", "齿", "侈", "耻", "斥", "赤", "翅", "仇", "绸", "畴", "酬", "稠", "筹", "瞅", "橱", "畜", "揣", "踹", "川", "喘", "炊", "垂", "捶", "锤", "唇", "醇", "蠢", "戳", "绰", "瓷", "慈", "磁", "赐", "匆", "囱", "葱", "丛", "凑", "簇", "窜", "催", "摧", "粹", "翠", "搓", "磋", "挫", "歹", "逮", "怠", "丹", "耽", "荡", "叨", "捣", "祷", "悼", "稻", "蹬", "邓", "凳", "瞪", "堤", "迪", "涤", "笛", "蒂", "缔", "颠", "巅", "甸", "垫", "淀", "惦", "奠", "殿", "刁", "叼", "雕", "钓", "爹", "迭", "谍", "叠", "碟", "丁", "叮", "盯", "鼎", "钉", "董", "栋", "兜", "抖", "陡", "逗", "睹", "杜", "妒", "兑", "敦", "盹", "炖", "哆", "舵", "堕", "惰", "讹", "俄", "娥", "鹅", "厄", "遏", "鳄", "饵", "伐", "阀", "帆", "贩", "芳", "妨", "肪", "纺", "绯", "匪", "诽", "沸", "芬", "吩", "坟", "焚", "粪", "蜂", "冯", "逢", "缝", "讽", "凤", "孵", "敷", "伏", "俘", "袱", "辐", "抚", "斧", "俯", "咐", "赴", "赋", "腹", "缚", "覆", "尬", "丐", "钙", "溉", "甘", "竿", "尴", "冈", "缸", "杠", "膏", "戈", "胳", "鸽", "搁", "割", "阁", "耕", "耿", "弓", "恭", "躬", "拱", "勾", "钩", "沽", "菇", "辜", "雇", "寡", "卦", "乖", "棺", "灌", "罐", "龟", "闺", "瑰", "桂", "棍", "郭", "骇", "酣", "函", "涵", "韩", "罕", "旱", "捍", "焊", "撼", "杭", "浩", "呵", "禾", "阂", "荷", "赫", "鹤", "嘿", "痕", "哼", "恒", "轰", "哄", "烘", "弘", "虹", "喉", "吼", "弧", "唬", "沪", "哗", "猾", "徊", "淮", "槐", "唤", "焕", "痪", "荒", "凰", "煌", "恍", "晃", "谎", "徽", "卉", "讳", "贿", "秽", "浑", "魂", "豁", "祸", "惑", "霍", "讥", "饥", "缉", "呷", "稽", "棘", "嫉", "脊", "忌", "剂", "迹", "祭", "寂", "颊", "贾", "嫁", "稼", "奸", "歼", "兼", "煎", "拣", "柬", "俭", "荐", "贱", "溅", "姜", "浆", "僵", "疆", "桨", "匠", "浇", "娇", "椒", "跤", "礁", "嚼", "狡", "绞", "矫", "搅", "缴", "轿", "酵", "皆", "劫", "捷", "竭", "诫", "津", "筋", "锦", "谨", "晋", "浸", "茎", "荆", "晶", "兢", "阱", "颈", "窘", "揪", "灸", "舅", "拘", "鞠", "菊", "橘", "沮", "矩", "炬", "惧", "锯", "倦", "诀", "掘", "崛", "爵", "倔", "君", "钧", "俊", "峻", "骏", "竣", "凯", "慨", "楷", "勘", "堪", "侃", "砍", "槛", "慷", "扛", "苛", "磕", "壳", "垦", "恳", "啃", "坑", "吭", "孔", "抠", "枯", "窟", "夸", "垮", "挎", "筐", "旷", "框", "窥", "魁", "馈", "溃", "愧", "昆", "捆", "廓", "喇", "腊", "蜡", "兰", "拦", "婪", "澜", "揽", "缆", "滥", "狼", "廊", "捞", "姥", "唠", "涝", "勒", "垒", "磊", "蕾", "棱", "愣", "黎", "吏", "隶", "粒", "莲", "廉", "敛", "链", "辽", "僚", "寥", "潦", "咧", "劣", "猎", "拎", "淋", "赁", "凌", "陵", "岭", "溜", "刘", "浏", "瘤", "柳", "遛", "咙", "胧", "聋", "笼", "隆", "窿", "拢", "垄", "搂", "陋", "芦", "卤", "虏", "鲁", "赂", "鹿", "碌", "吕", "侣", "铝", "屡", "缕", "履", "滤", "挛", "卵", "掠", "抡", "伦", "罗", "萝", "螺", "裸", "迈", "脉", "蛮", "瞒", "蔓", "芒", "氓", "茫", "莽", "茅", "髦", "茂", "玫", "枚", "眉", "霉", "昧", "媚", "魅", "闷", "萌", "朦", "孟", "弥", "谜", "觅", "泌", "蜜", "绵", "勉", "缅", "苗", "瞄", "渺", "庙", "蔑", "鸣", "铭", "谬", "蘑", "魔", "抹", "沫", "陌", "莫", "寞", "牡", "亩", "姆", "沐", "牧", "募", "睦", "慕", "暮", "穆", "呐", "乃", "囊", "挠", "恼", "馁", "嫩", "尼", "拟", "逆", "匿", "腻", "黏", "酿", "尿", "捏", "拧", "凝", "纽", "奴", "虐", "挪", "哦", "欧", "殴", "呕", "趴", "帕", "徘", "潘", "攀", "叛", "畔", "乓", "庞", "膀", "抛", "刨", "袍", "胚", "沛", "佩", "抨", "烹", "棚", "蓬", "鹏", "篷", "膨", "捧", "劈", "疲", "辟", "媲", "僻", "譬", "飘", "撇", "乒", "坪", "萍", "颇", "魄", "剖", "仆", "菩", "朴", "浦", "谱", "瀑", "沏", "栖", "凄", "戚", "漆", "歧", "祈", "棋", "乞", "岂", "迄", "泣", "契", "砌", "掐", "洽", "虔", "钳", "遣", "谴", "嵌", "呛", "腔", "乔", "侨", "俏", "窍", "翘", "撬", "怯", "窃", "钦", "秦", "禽", "寝", "擎", "顷", "丘", "囚", "驱", "屈", "躯", "娶", "拳", "犬", "雀", "壤", "攘", "嚷", "饶", "惹", "仁", "韧", "溶", "冗", "柔", "揉", "儒", "辱", "锐", "瑞", "撒", "萨", "桑", "嗓", "骚", "嫂", "臊", "僧", "纱", "砂", "鲨", "厦", "筛", "删", "煽", "擅", "膳", "赡", "捎", "梢", "哨", "奢", "慑", "绅", "肾", "渗", "慎", "绳", "尸", "狮", "蚀", "矢", "氏", "侍", "逝", "嗜", "誓", "匙", "兽", "抒", "枢", "梳", "疏", "赎", "署", "蜀", "曙", "竖", "恕", "堂", "耍", "衰", "甩", "拴", "栓", "涮", "霜", "瞬", "烁", "丝", "斯", "撕", "伺", "祀", "饲", "肆", "耸", "讼", "宋", "诵", "颂", "艘", "嗽", "酥", "溯", "蒜", "髓", "遂", "隧", "嗦", "塌", "胎", "汰", "泰", "贪", "摊", "滩", "瘫", "坛", "痰", "潭", "毯", "炭", "碳", "唐", "塘", "膛", "倘", "淌", "烫", "涛", "滔", "陶", "淘", "腾", "藤", "剔", "屉", "剃", "涕", "惕", "舔", "帖", "廷", "亭", "艇", "捅", "桶", "筒", "凸", "秃", "涂", "屠", "颓", "屯", "驮", "妥", "拓", "唾", "蛙", "瓦", "歪", "丸", "挽", "惋", "婉", "腕", "汪", "枉", "妄", "伪", "纬", "萎", "畏", "魏", "瘟", "纹", "蚊", "吻", "紊", "翁", "涡", "窝", "沃", "巫", "呜", "吴", "侮", "捂", "勿", "晤", "雾", "昔", "晰", "稀", "锡", "溪", "熙", "熄", "膝", "嬉", "袭", "媳", "隙", "虾", "瞎", "侠", "峡", "狭", "辖", "霞", "仙", "纤", "掀", "贤", "弦", "衔", "宪", "馅", "羡", "腺", "厢", "镶", "翔", "巷", "橡", "肖", "削", "宵", "萧", "潇", "淆", "孝", "啸", "邪", "挟", "携", "泄", "泻", "卸", "屑", "懈", "芯", "馨", "衅", "猩", "腥", "刑", "汹", "羞", "朽", "绣", "锈", "嗅", "墟", "徐", "旭", "叙", "恤", "酗", "絮", "婿", "蓄", "喧", "玄", "炫", "靴", "穴", "勋", "熏", "旬", "巡", "汛", "驯", "逊", "丫", "鸦", "芽", "崖", "涯", "哑", "雅", "讶", "咽", "淹", "岩", "阎", "衍", "掩", "雁", "焰", "燕", "殃", "秧", "杨", "痒", "漾", "妖", "窑", "谣", "遥", "久", "椰", "冶", "伊", "夷", "怡", "矣", "倚", "屹", "亦", "抑", "役", "绎", "弈", "疫", "逸", "裔", "溢", "毅", "翼", "荫", "姻", "殷", "瘾", "婴", "鹰", "荧", "盈", "莹", "蝇", "颖", "佣", "庸", "咏", "涌", "踊", "悠", "佑", "诱", "渔", "逾", "渝", "愚", "舆", "屿", "驭", "郁", "吁", "狱", "浴", "喻", "御", "寓", "裕", "愈", "冤", "渊", "袁", "曰", "岳", "悦", "粤", "匀", "陨", "孕", "酝", "韵", "蕴", "砸", "栽", "宰", "攒", "赃", "葬", "凿", "枣", "藻", "皂", "灶", "噪", "燥", "躁", "泽", "贼", "渣", "闸", "眨", "诈", "榨", "窄", "寨", "沾", "粘", "瞻", "斩", "盏", "崭", "绽", "蘸", "彰", "仗", "杖", "帐", "胀", "沼", "兆", "赵", "罩", "肇", "遮", "辙", "浙", "贞", "侦", "枕", "睁", "筝", "蒸", "拯", "郑", "芝", "肢", "脂", "斤", "帜", "峙", "挚", "秩", "窒", "滞", "稚", "衷", "仲", "舟", "州", "洲", "轴", "宙", "昼", "皱", "骤", "朱", "株", "烛", "拄", "嘱", "瞩", "贮", "铸", "爪", "拽", "砖", "撰", "妆", "桩", "幢", "坠", "缀", "拙", "灼", "卓", "浊", "酌", "琢", "姿", "兹", "滋", "踪", "粽", "揍", "卒", "佐"]

hsk1_list = []
hsk2_list = []
hsk3_list = []
hsk4_list = []
hsk5_list = []
hsk6_list = []
hsk_above_list = []


# hsk1.each do |char|

#   hsk1_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 1,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end

# hsk2.each do |char|

#   hsk2_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 2,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end


# hsk3.each do |char|

#   hsk3_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 3,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end

# hsk4.each do |char|

#   hsk4_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 4,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end

# hsk5.each do |char|

#   hsk5_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 5,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end

# hsk6.each do |char|

#   hsk6_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 6,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end

# hsk_above.each do |char|

#   hsk_above_list << {
#     simplified: char,
#     traditional: "",
#     hsk_level: 7,
#     appeared: 0,
#     correct: 0,
#     components: 0,
#     strokes: 0,
#     incorrect: {},
#     pinyin: [],
#     choices: ["", "", "", ""],
#     checked: false
#   }
# end

# Character.create(hsk1_list)
# Character.create(hsk2_list)
# Character.create(hsk3_list)
# Character.create(hsk4_list)
# Character.create(hsk5_list)
# Character.create(hsk6_list)
# Character.create(hsk_above_list)

#   teachers = [
#     {
#       username: "wangpeng",
#       password: "password",
#       password_confirmation: "password",
#       first_name: "Peng",
#       last_name: "Wang",
#       email: "wangpeng@williams.edu",
#       school: "Williams College",
#       country: "United States",
#       admin: false
#     },
#     {
#       username: "liyou",
#       password: "password",
#       password_confirmation: "password",
#       first_name: "You",
#       last_name: "Li",
#       email: "liyou@uoregon.edu",
#       school: "University of Oregon",
#       country: "United States",
#       admin: false
#       },
#       {
#         username: "zhangheng",
#         password: "password",
#         password_confirmation: "password",
#         first_name: "Heng",
#         last_name: "Zhang",
#         email: "zhangheng@mit.edu",
#         school: "MIT",
#         country: "United States",
#         admin: false
#         }
#   ]

#   Teacher.create(teachers)

  # classGroups = []

# 20.times do |i|
#   random_groups = ['CHN101', 'CHN102', 'CHN103', 'CHN201', 'CHN202', 'CHN203', 'CHN301', 'CHN302', 'CHN303', 'CHN401', 'CHN402', 'CHN403']
#   classGroups << {
#     name: random_groups.sample,
#     teacher_id: Teacher.all.sample.id,
#     uuid: SecureRandom.uuid
#   }
# end

# ClassGroup.create(  {
#   name: "General",
#   teacher_id: 1,
#   uuid: SecureRandom.uuid
# })

# students = []

# 300.times do |i|
#   username = Faker::Internet.username + rand(1..1000).to_s

#   students << {
#     username: username,
#     password: "password",
#     password_confirmation: "password",
#     first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     email: Faker::Internet.email,
#     first_language: Faker::Nation.language,
#     country: Faker::Address.country,
#     school: Faker::University.name,
#     role: "student",
#     age: rand(18..70),
#     other_L2: Faker::Nation.language,
#     home_learning: rand(0..10),
#     class_learning: rand(0..10),
#     other_info: Faker::Lorem.sentence
#   }
# end

# Student.create!(students)

# Student.all.each do |student|
#   check_id = ClassGroup.all.sample.id
#   puts check_id
#   Registration.create!({
#     class_group_id: check_id,
#     student_id: student.id
#   })
# end 

# tests = []

# 1000.times do |i|
#   items = []
#   correct = 0
#   rand(1..100).times do |j|
#     selection = rand(0..4)
#     if selection==0
#       correct+=1
#     end
#     items << {
#       character_id: 1+j*20,
#       correct: selection==0 ? true : false,
#       choice: selection==4 ? "IDK" : Character.find(1+j*20).choices[selection]
#     }
#   end

#   student_id = Student.all.sample.id
#   tests << {
#     student_id: student_id,
#     score: correct,
#     items: items
#   }

#   Student.find(student_id).update({scores: Student.find(student_id).scores << correct})

# end

# Test.create!(tests)



  # ClassGroup.create({
  #   name: "Generic Class",
  #   teacher_id: 1,
  #   uuid: "d6f927bc-fed7-4ab2-b78d-aefdeef134b1",
  #   level: 0
  # })