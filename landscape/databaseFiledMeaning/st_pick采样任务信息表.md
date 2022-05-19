# st_pick
采样任务信息表，保存由采样员填写的采样原始记录表的信息。
在创建任务单之后，由管理员（可能是采样主管）分配采样任务给采样员后进行。
## PickID

主键

## ProjectID
与任务单ID（mt_project表中的ProjectID,可见[检测任务信息表](mt_project检测任务信息表.md)）相关联，一个任务单可能对应多个采样任务。
## InspectTypeID
检测类别ID，对应表setting_inspecttype中的主键InspectTypeID。见[检测项目类型分类表](Setting_InspectType检测项目类别分类)。
## PickTime
采样时间
## PickEndTime
采样结束时间
## PickDateFrom
采样开始日期
## PickDateTo
采样结束日期
## PickPurpose
## PickHandle
采样方法/保存方法
## PickMem
## MonitorPlaceCount
## InspectItems
分析项目（因子）（即检测项目，如氨氮、总磷），以英文分号隔开，对应表[检测项目设置表](setting_analysisItemAbbreviation检测项目设置.md)
## InspectItemIDs
分析因子的ID，以英文分号隔开，示例值：2;3
## FrequencyDescption
## MonitorAmountPerDay
## CheckMan
## CheckSuggestion
## CheckDate
## ChargeSampleMan
## WorkDays
## SamplingType
## PickStatus
采样状态，end running
## SubmitMan
## SubmitDate
## PickRecord
采样记录，示例值：水和废水采样原始记录表
## WorkFlowCaseID
## MonitorPlace
点位名称，需要填写在采样记录中
## TemplateID
采样记录表单模板的ID
## EnCommitDate
## QCAssess
## ImportsSamplingPoint
## PlaceType
## DataVersion
## FrequencyDayIndex
## FrequencyTimeIndex
## FunctionType
## MainSource
## OriginalPickID
## PickStartTime
## PlanRequire
## ProjectItemID
## RoomType
## IsEditAfterHandover
## ProjectItemIdStr
## MonitoringAreaID
## CodeModel
## InitialCode
## Step
## EXInfo
## ChatID
## AnalyseItems
分析项目
## AnalyseItemsIDs
分析项目ID
## isPaySample
## OriginalDataJson
## ZSProjectID
## IsRead
## CoopID
协作ID，在工作台的待办事项中展示。
## CartridgeBatchNo
## IsToPick
## isdelete
## PickUserIDs
## Remark
## ImageFiles
采样表单的图片文件
