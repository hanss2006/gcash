import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { PlantBase } from '../plant-base';
import { Settings } from '../settings';
import { Cat } from '../cat';
import { Plant } from '../plant';
import { CatsService } from '../cats.service';
import { PlantsService } from '../plants.service';
import { Comment } from '../comment';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'plants-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['../user-edit/form.css', './plant-detail.component.css']
})
export class PlantDetailComponent extends PlantBase implements OnInit {
  plant: Plant;
  featured: boolean = false;
  comments: Comment[];
  comment: Comment;
  @ViewChild('lastcomment') lastComment: ElementRef;

  constructor(private route: ActivatedRoute, private cs: CatsService,
  private ps: PlantsService, private title: Title, private cms: CommentsService) {
    super();
  }

  ngOnInit() {
    this.featured = this.route.snapshot.queryParamMap.get('featured') == '1';
    if (!this.featured) {
      this.page = parseInt(this.route.snapshot.queryParamMap.get('page') || '1');
      this.search = this.route.snapshot.queryParamMap.get('search') || '';
    }
    const id: string = this.route.snapshot.paramMap.get('id');
    const cat: string = this.route.snapshot.paramMap.get('cat');
    this.ps.getPlant(id).subscribe((plant: Plant) => {
      this.plant = plant;
      this.cs.getCat(cat).subscribe((cat: Cat) => {
        this.title.setTitle(plant.name + ' :: ' + cat.name + ' :: ' + Settings.title);
      });
      this.newComment();
    });
    this.cms.getComments(id).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  private submitComment(): void {
    this.cms.setComment(this.comment).subscribe(response => {
      if (response.status === 1) {
        this.comments.push(response.data);
        this.newComment();
        this.lastComment.nativeElement.scrollIntoView(true);
      }
    });
  }
  
  private newComment(): void {
    this.comment = new Comment();
    this.comment.plant = this.plant.id;
  }
}
