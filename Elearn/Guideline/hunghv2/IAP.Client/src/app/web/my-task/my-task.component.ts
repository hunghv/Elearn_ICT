import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/services/authentication/auth.service';
import { UserInformation } from '../../shared/models/user.model';
import { MyTaskService } from '../../shared/services/data-service/task.service';
import { MyTaskModel } from '../../shared/models/mytask.model';

@Component({
  selector: 'iap-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {
  userInformation: UserInformation;
  constructor(private titleService: Title,
    private authService: AuthService,private myTaskService: MyTaskService
  ) {
    this.titleService.setTitle('myAssurance | My Task');
  }

  allTasks : MyTaskModel[]

  ngOnInit() {
    this.userInformation = this.authService.getUserInformation();
    this.myTaskService.getAll().subscribe(res =>
      {
        this.allTasks = res
      }
    );
  }

}
