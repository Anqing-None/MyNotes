# mt_project
检测任务信息表
创建任务单，选择委托单位（即委托检测公司的检测样品甲方），受检单位（即需要检测样品的公司/项目名称，委托单位和受检单位可能不一样，受检单位是检测的对象）。
填写检测内容，需要检测什么项目，检测的目的是什么（场地调查/普通的委托检测等等），检测目的对应的字段是projecttype，存在数据表setting_projectType中。
填完任务单后即可下发任务给采样员执行采样任务。
填写任务单这个流程一般是签订合同之后，由任务派发人（可能是客服/销售）来执行此流程。
相关的检测项目（如氨氮、总磷等）记录在了mt_projectitem表中。

## ProjectID
任务ID，主键
## Type
任务类型，示例值：委托检测，与表setting_projectType相关
## Creator
任务创建者，示例U000001，表fx_userinfo中UserID字段
## Date

## Name
## Manager
## FinishDate
## WatchPurpose
## WatchType
## WorkFlowCaseID
## OtherText
## MissionID
## MissionDataID
## PollutionID
## UnitID
## IsReMonitor
## ReMonitorRemark
## IsRepairMonitor
## RepairMonitorRemark
## LabToPrePareRemark
## LimsActID
## PickAuditRemark
## ProjectCode
任务编号
## \*\*ProjectState
任务状态，任务状态，draft | runing | abort | end    
旧数据状态：
0-进行中，1-已完结，2-已删除（旧数据中没用上）
## QCDepartmentRemark
## StateEndDate
## ChatID
## SupervisionDirector
## ReportDelWay
## IsMonitorType
## LicenceJson
## IsComplaint
## IsRead
## Remark
## ProjectOffID
## TaskAttribute
## EntrustMissionID
委托任务ID
## CoopID
业务协同ID，该任务的业务协同ID，用来跟踪业务进展
## ExtraInfo
机构ID，SaaS模式
## OrgID
## ContractNo
合同编号,与该任务相关的合同

## isdelete
