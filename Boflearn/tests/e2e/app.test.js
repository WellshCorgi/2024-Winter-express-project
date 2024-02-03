// tests/e2e/app.test.js
const request = require('supertest');
const app = require('../../app');

describe('End-to-End Tests', () => {
  let teacherAgent; // 강사용 에이전트
  let studentAgent; // 학생용 에이전트

  // 선생님 등록 및 강좌 생성
  beforeAll(async () => {
    // 강사로 로그인하고 강좌 생성
    teacherAgent = request.agent(app);
    await teacherAgent.post('/auth/login').send({
      email: 'teacher@example.com',
      password: 'testpassword',
    });

    // 강좌 생성
    await teacherAgent.post('/course/create').send({
      title: '테스트 강좌',
      description: '테스트 설명',
      price: 29.99,
      url: 'https://example.com',
    });
  });

  // 학생 등록 및 강좌 수강 신청
  it('학생을 등록하고 강좌를 수강 신청해야 합니다', async () => {
    // 학생으로 로그인하고 강좌 수강 신청
    studentAgent = request.agent(app);
    await studentAgent.post('/user/register').send({
      email: 'student@example.com',
      password: 'testpassword',
      name: '학생',
      role: 'student',
    });

    await studentAgent.post('/auth/login').send({
      email: 'student@example.com',
      password: 'testpassword',
    });

    // 강좌 수강 신청
    const response = await studentAgent.post('/course/enroll/1');
    expect(response.statusCode).toBe(302); 
  });

  // 테스트 종료 후 로그아웃
  afterAll(async () => {
    await teacherAgent.post('/auth/logout');
    await studentAgent.post('/auth/logout');
  });
});
