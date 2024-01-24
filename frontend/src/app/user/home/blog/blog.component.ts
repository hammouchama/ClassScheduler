import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogItems = [
    {
        id: 1,
        blogImg: 'assets/img/blog/blog-1.jpg',
        title: 'The Challenge Of Global Learning In Public Education',
        authorImg: 'assets/img/course/teacher/teacher-1.jpg',
        authorName: 'Jim Séchen',
        category: 'Art & Design',
        date:'April 02, 2022',
        color:'green'
    },
    {
        id: 2,
        blogImg: 'assets/img/blog/blog-2.jpg',
        title: 'Exactly How Technology Can Make Reading Better',
        authorImg: 'assets/img/course/teacher/teacher-2.jpg',
        authorName: 'Barry Tone',
        category: 'UX Design',
        date:'January 05, 2022',
        color:'sky-blue'
    },
    {
        id: 3,
        blogImg: 'assets/img/blog/blog-3.jpg',
        title: 'New Chicago school budget relies on state pension',
        authorImg: 'assets/img/course/teacher/teacher-3.jpg',
        authorName: 'Samuel Serif',
        category: 'Development',
        date:'February 08, 2022',
        color:'green',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
