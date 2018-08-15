export class Workflow {
  workflowName: string;
  lastestRemark?: any;
  commandViewModels: CommandViewModel[];
  hiddenControlViewModels: any[];
  enabledControlViewModels: any[];

  constructor(
    workflowName: string,
    lastestRemark: any,
    commandViewModels: CommandViewModel[],
    hiddenControlViewModels: any[],
    enabledControlViewModels: any[],
  ) { }
}

export class CommandViewModel {

  constructor(
    public commandName: string,
    public commandInternalName: string,
    public customScriptFunction: string,
    public postCustomScriptFunction: any,
    public isRemarkRequired: boolean,
  ) { }
}