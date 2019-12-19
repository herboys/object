# 万达信息Ai智能医疗项目


{
 "type": "mysql",
 "url": "10.2.6.122:3306",
 "userName": "root",
 "passWord": "nj971124",
 "dataBase": "mp",
 "cardIdCol": "card_id",
 "mainTableName": "info",
 "formId": "823",
 "requestQuestionMap":{
  "2737":{ // 问题id
   "type": "1", 问题类型
       "sequence": "detail#card_id", // 每个问题得”分表名加字段，分表名加字段“
   "foreignColumnName": "detail#card_id,detail#type", 分表名加分表得外键名
   "mainTableColumnName": "card_id,type" // 主表内外键对应得自断名
  },
  "2738":{
   "type":"2",
   "sequence":"detail#discript",
   "foreignColumnName": "detail#card_id,detail#type",
   "mainTableColumnName": "card_id,type"
  },
  "2739":{
   "type":"3",
   "sequence":"user_info#name,user_info#age",
   "foreignColumnName":"user_info#id",
   "mainTableColumnName":"card_id"
  }
 }
}
