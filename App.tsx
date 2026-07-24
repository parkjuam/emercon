/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Search, Phone, User, Users, ShieldCheck, Plus, Trash2, ArrowLeft } from 'lucide-react';

// 임시 데이터 타입 정의 (데이터를 받으면 수정할 예정입니다)
type StudentContact = {
  id: string;
  studentName: string;
  gradeClass: string;
  homeroomTeacher: {
    name: string;
    phone: string;
  };
  coTeacher?: {
    name: string;
    phone: string;
  };
};

// 임시 데이터
const MOCK_DATA: StudentContact[] = [
  { id: '1', studentName: '김지안', gradeClass: '초등 4학년2', homeroomTeacher: { name: '함유라', phone: '010-8098-7120' }, coTeacher: { name: '박진숙', phone: '010-8721-2864' } },
  { id: '2', studentName: '김우진', gradeClass: '중등 2학년1', homeroomTeacher: { name: '오석준', phone: '010-6286-6779' }, coTeacher: { name: '류창일', phone: '010-8233-7346' } },
  { id: '3', studentName: '박준수', gradeClass: '중등 2학년2', homeroomTeacher: { name: '최지영', phone: '010-5179-4147' }, coTeacher: { name: '심영선', phone: '010-3905-2185' } },
  { id: '4', studentName: '이강현', gradeClass: '중등 2학년1', homeroomTeacher: { name: '오석준', phone: '010-6286-6779' }, coTeacher: { name: '류창일', phone: '010-8233-7346' } },
  { id: '5', studentName: '손유민', gradeClass: '고등 1학년2', homeroomTeacher: { name: '박선영', phone: '010-6329-3581' }, coTeacher: { name: '김경옥', phone: '010-6745-4263' } },
  { id: '6', studentName: '주유성', gradeClass: '고등 1학년1', homeroomTeacher: { name: '김명섭', phone: '010-4854-7860' }, coTeacher: { name: '서우덕', phone: '010-9114-2396' } },
  { id: '7', studentName: '박수민', gradeClass: '고등 3학년1', homeroomTeacher: { name: '유은희', phone: '010-5078-1400' }, coTeacher: { name: '김태호', phone: '010-9215-8626' } },
  { id: '8', studentName: '이성빈', gradeClass: '고등 3학년2', homeroomTeacher: { name: '황신화', phone: '010-7749-7352' }, coTeacher: { name: '이수연', phone: '010-7611-5606' } },
  { id: '9', studentName: '봉시현', gradeClass: '초등 1학년1', homeroomTeacher: { name: '선하라', phone: '010-8377-5309' }, coTeacher: { name: '송현경', phone: '010-5418-1914' } },
  { id: '10', studentName: '우서진', gradeClass: '초등 1학년1', homeroomTeacher: { name: '선하라', phone: '010-8377-5309' }, coTeacher: { name: '송현경', phone: '010-5418-1914' } },
  { id: '11', studentName: '이해성', gradeClass: '초등 1학년1', homeroomTeacher: { name: '선하라', phone: '010-8377-5309' }, coTeacher: { name: '송현경', phone: '010-5418-1914' } },
  { id: '12', studentName: '박가온', gradeClass: '초등 2학년1', homeroomTeacher: { name: '박보미', phone: '010-8432-5120' }, coTeacher: { name: '심은미', phone: '010-8212-3373' } },
  { id: '13', studentName: '박다솜', gradeClass: '초등 2학년1', homeroomTeacher: { name: '박보미', phone: '010-8432-5120' }, coTeacher: { name: '심은미', phone: '010-8212-3373' } },
  { id: '14', studentName: '이도언', gradeClass: '초등 2학년1', homeroomTeacher: { name: '박보미', phone: '010-8432-5120' }, coTeacher: { name: '심은미', phone: '010-8212-3373' } },
  { id: '15', studentName: '편유주', gradeClass: '초등 2학년1', homeroomTeacher: { name: '박보미', phone: '010-8432-5120' }, coTeacher: { name: '심은미', phone: '010-8212-3373' } },
  { id: '16', studentName: '강서준', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '17', studentName: '배지예', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '18', studentName: '이유성', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '19', studentName: '우서우', gradeClass: '초등 4학년1', homeroomTeacher: { name: '김재환', phone: '010-6261-5008' }, coTeacher: { name: '박수진', phone: '010-8660-8680' } },
  { id: '20', studentName: '유동엽', gradeClass: '초등 4학년1', homeroomTeacher: { name: '김재환', phone: '010-6261-5008' }, coTeacher: { name: '박수진', phone: '010-8660-8680' } },
  { id: '21', studentName: '신온유', gradeClass: '초등 5학년2', homeroomTeacher: { name: '정재은', phone: '010-6644-0504' }, coTeacher: { name: '박주암', phone: '010-6348-9911' } },
  { id: '22', studentName: '김동욱', gradeClass: '중등 1학년2', homeroomTeacher: { name: '김주리', phone: '010-7369-0506' }, coTeacher: { name: '박예림', phone: '010-6226-4665' } },
  { id: '23', studentName: '김지우', gradeClass: '중등 2학년2', homeroomTeacher: { name: '최지영', phone: '010-5179-4147' }, coTeacher: { name: '심영선', phone: '010-3905-2185' } },
  { id: '24', studentName: '김영준', gradeClass: '중등 3학년2', homeroomTeacher: { name: '김민성', phone: '010-5107-0755' }, coTeacher: { name: '한혜경', phone: '010-3110-1617' } },
  { id: '25', studentName: '신재민', gradeClass: '고등 1학년2', homeroomTeacher: { name: '박선영', phone: '010-6329-3581' }, coTeacher: { name: '김경옥', phone: '010-6745-4263' } },
  { id: '26', studentName: '장민기', gradeClass: '고등 1학년2', homeroomTeacher: { name: '박선영', phone: '010-6329-3581' }, coTeacher: { name: '김경옥', phone: '010-6745-4263' } },
  { id: '27', studentName: '이선', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '28', studentName: '이채원', gradeClass: '고등 3학년2', homeroomTeacher: { name: '황신화', phone: '010-7749-7352' }, coTeacher: { name: '이수연', phone: '010-7611-5606' } },
  { id: '29', studentName: '유은호', gradeClass: '초등 1학년1', homeroomTeacher: { name: '선하라', phone: '010-8377-5309' }, coTeacher: { name: '송현경', phone: '010-5418-1914' } },
  { id: '30', studentName: '정아린', gradeClass: '초등 1학년2', homeroomTeacher: { name: '조남이', phone: '010-9125-0568' }, coTeacher: { name: '변진희', phone: '010-8396-0797' } },
  { id: '31', studentName: '채연우', gradeClass: '초등 1학년2', homeroomTeacher: { name: '조남이', phone: '010-9125-0568' }, coTeacher: { name: '변진희', phone: '010-8396-0797' } },
  { id: '32', studentName: '추시안', gradeClass: '초등 1학년2', homeroomTeacher: { name: '조남이', phone: '010-9125-0568' }, coTeacher: { name: '변진희', phone: '010-8396-0797' } },
  { id: '33', studentName: '조한결', gradeClass: '초등 3학년2', homeroomTeacher: { name: '김민영1', phone: '010-5142-2410' }, coTeacher: { name: '최정원', phone: '010-5655-1138' } },
  { id: '34', studentName: '최지훈', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '35', studentName: '김도운', gradeClass: '초등 4학년2', homeroomTeacher: { name: '함유라', phone: '010-8098-7120' }, coTeacher: { name: '박진숙', phone: '010-8721-2864' } },
  { id: '36', studentName: '김은성', gradeClass: '초등 5학년2', homeroomTeacher: { name: '정재은', phone: '010-6644-0504' }, coTeacher: { name: '박주암', phone: '010-6348-9911' } },
  { id: '37', studentName: '장시우', gradeClass: '초등 5학년2', homeroomTeacher: { name: '정재은', phone: '010-6644-0504' }, coTeacher: { name: '박주암', phone: '010-6348-9911' } },
  { id: '38', studentName: '곽승현', gradeClass: '초등 6학년2', homeroomTeacher: { name: '박인숙', phone: '010-9061-4681' }, coTeacher: { name: '박은정', phone: '010-2488-2468' } },
  { id: '39', studentName: '김예원', gradeClass: '초등 6학년2', homeroomTeacher: { name: '박인숙', phone: '010-9061-4681' }, coTeacher: { name: '박은정', phone: '010-2488-2468' } },
  { id: '40', studentName: '김지성', gradeClass: '초등 6학년1', homeroomTeacher: { name: '양주영', phone: '010-4310-2083' }, coTeacher: { name: '노장호', phone: '010-2768-7403' } },
  { id: '41', studentName: '이한결', gradeClass: '초등 6학년2', homeroomTeacher: { name: '박인숙', phone: '010-9061-4681' }, coTeacher: { name: '박은정', phone: '010-2488-2468' } },
  { id: '42', studentName: '김민준', gradeClass: '중등 1학년2', homeroomTeacher: { name: '김주리', phone: '010-7369-0506' }, coTeacher: { name: '박예림', phone: '010-6226-4665' } },
  { id: '43', studentName: '서민경', gradeClass: '중등 1학년2', homeroomTeacher: { name: '김주리', phone: '010-7369-0506' }, coTeacher: { name: '박예림', phone: '010-6226-4665' } },
  { id: '44', studentName: '최수원', gradeClass: '중등 1학년2', homeroomTeacher: { name: '김주리', phone: '010-7369-0506' }, coTeacher: { name: '박예림', phone: '010-6226-4665' } },
  { id: '45', studentName: '김태조', gradeClass: '중등 2학년2', homeroomTeacher: { name: '최지영', phone: '010-5179-4147' }, coTeacher: { name: '심영선', phone: '010-3905-2185' } },
  { id: '46', studentName: '방선호', gradeClass: '중등 2학년1', homeroomTeacher: { name: '오석준', phone: '010-6286-6779' }, coTeacher: { name: '류창일', phone: '010-8233-7346' } },
  { id: '47', studentName: '윤예찬', gradeClass: '중등 2학년2', homeroomTeacher: { name: '최지영', phone: '010-5179-4147' }, coTeacher: { name: '심영선', phone: '010-3905-2185' } },
  { id: '48', studentName: '장찬', gradeClass: '중등 2학년2', homeroomTeacher: { name: '최지영', phone: '010-5179-4147' }, coTeacher: { name: '심영선', phone: '010-3905-2185' } },
  { id: '49', studentName: '한재아', gradeClass: '중등 2학년1', homeroomTeacher: { name: '오석준', phone: '010-6286-6779' }, coTeacher: { name: '류창일', phone: '010-8233-7346' } },
  { id: '50', studentName: '김영민', gradeClass: '중등 3학년1', homeroomTeacher: { name: '김아영', phone: '010-8952-9959' }, coTeacher: { name: '김동인', phone: '010-3033-7396' } },
  { id: '51', studentName: '홍종호', gradeClass: '중등 3학년2', homeroomTeacher: { name: '김민성', phone: '010-5107-0755' }, coTeacher: { name: '한혜경', phone: '010-3110-1617' } },
  { id: '52', studentName: '권아연', gradeClass: '고등 1학년2', homeroomTeacher: { name: '박선영', phone: '010-6329-3581' }, coTeacher: { name: '김경옥', phone: '010-6745-4263' } },
  { id: '53', studentName: '권한결', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '54', studentName: '박주하', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '55', studentName: '백예나', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '56', studentName: '안지유', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '57', studentName: '임채원', gradeClass: '초등 1학년2', homeroomTeacher: { name: '조남이', phone: '010-9125-0568' }, coTeacher: { name: '변진희', phone: '010-8396-0797' } },
  { id: '58', studentName: '고범준', gradeClass: '초등 2학년2', homeroomTeacher: { name: '김미영', phone: '010-9170-3307' }, coTeacher: { name: '조영준', phone: '010-2502-0586' } },
  { id: '59', studentName: '김이준', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '60', studentName: '김소윤', gradeClass: '초등 4학년2', homeroomTeacher: { name: '함유라', phone: '010-8098-7120' }, coTeacher: { name: '박진숙', phone: '010-8721-2864' } },
  { id: '61', studentName: '양현우', gradeClass: '초등 5학년1', homeroomTeacher: { name: '김은혜', phone: '010-9145-7695' }, coTeacher: { name: '박지환', phone: '010-8191-7284' } },
  { id: '62', studentName: '어태원', gradeClass: '초등 5학년1', homeroomTeacher: { name: '김은혜', phone: '010-9145-7695' }, coTeacher: { name: '박지환', phone: '010-8191-7284' } },
  { id: '63', studentName: '김도현', gradeClass: '초등 6학년1', homeroomTeacher: { name: '양주영', phone: '010-4310-2083' }, coTeacher: { name: '노장호', phone: '010-2768-7403' } },
  { id: '64', studentName: '김혁진', gradeClass: '중등 1학년2', homeroomTeacher: { name: '김주리', phone: '010-7369-0506' }, coTeacher: { name: '박예림', phone: '010-6226-4665' } },
  { id: '65', studentName: '정승교', gradeClass: '중등 1학년1', homeroomTeacher: { name: '천은희', phone: '010-4375-2828' }, coTeacher: { name: '임하나', phone: '010-3604-7815' } },
  { id: '66', studentName: '김태건', gradeClass: '중등 2학년2', homeroomTeacher: { name: '최지영', phone: '010-5179-4147' }, coTeacher: { name: '심영선', phone: '010-3905-2185' } },
  { id: '67', studentName: '윤민호', gradeClass: '중등 2학년1', homeroomTeacher: { name: '오석준', phone: '010-6286-6779' }, coTeacher: { name: '류창일', phone: '010-8233-7346' } },
  { id: '68', studentName: '민한빛', gradeClass: '중등 3학년1', homeroomTeacher: { name: '김아영', phone: '010-8952-9959' }, coTeacher: { name: '김동인', phone: '010-3033-7396' } },
  { id: '69', studentName: '박시현', gradeClass: '중등 3학년2', homeroomTeacher: { name: '김민성', phone: '010-5107-0755' }, coTeacher: { name: '한혜경', phone: '010-3110-1617' } },
  { id: '70', studentName: '송서율', gradeClass: '중등 3학년1', homeroomTeacher: { name: '김아영', phone: '010-8952-9959' }, coTeacher: { name: '김동인', phone: '010-3033-7396' } },
  { id: '71', studentName: '용소이', gradeClass: '중등 3학년1', homeroomTeacher: { name: '김아영', phone: '010-8952-9959' }, coTeacher: { name: '김동인', phone: '010-3033-7396' } },
  { id: '72', studentName: '이종원', gradeClass: '중등 3학년2', homeroomTeacher: { name: '김민성', phone: '010-5107-0755' }, coTeacher: { name: '한혜경', phone: '010-3110-1617' } },
  { id: '73', studentName: '김민기', gradeClass: '고등 1학년1', homeroomTeacher: { name: '김명섭', phone: '010-4854-7860' }, coTeacher: { name: '서우덕', phone: '010-9114-2396' } },
  { id: '74', studentName: '이민지', gradeClass: '고등 1학년2', homeroomTeacher: { name: '박선영', phone: '010-6329-3581' }, coTeacher: { name: '김경옥', phone: '010-6745-4263' } },
  { id: '75', studentName: '이현우', gradeClass: '고등 1학년1', homeroomTeacher: { name: '김명섭', phone: '010-4854-7860' }, coTeacher: { name: '서우덕', phone: '010-9114-2396' } },
  { id: '76', studentName: '성재희', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '77', studentName: '이경윤', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '78', studentName: '정진영', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '79', studentName: '김유진', gradeClass: '고등 3학년2', homeroomTeacher: { name: '황신화', phone: '010-7749-7352' }, coTeacher: { name: '이수연', phone: '010-7611-5606' } },
  { id: '80', studentName: '서유현', gradeClass: '고등 3학년2', homeroomTeacher: { name: '황신화', phone: '010-7749-7352' }, coTeacher: { name: '이수연', phone: '010-7611-5606' } },
  { id: '81', studentName: '지승원', gradeClass: '고등 3학년2', homeroomTeacher: { name: '황신화', phone: '010-7749-7352' }, coTeacher: { name: '이수연', phone: '010-7611-5606' } },
  { id: '82', studentName: '이하준', gradeClass: '초등 1학년1', homeroomTeacher: { name: '선하라', phone: '010-8377-5309' }, coTeacher: { name: '송현경', phone: '010-5418-1914' } },
  { id: '83', studentName: '강민준', gradeClass: '초등 2학년1', homeroomTeacher: { name: '박보미', phone: '010-8432-5120' }, coTeacher: { name: '심은미', phone: '010-8212-3373' } },
  { id: '84', studentName: '이엘', gradeClass: '초등 2학년2', homeroomTeacher: { name: '김미영', phone: '010-9170-3307' }, coTeacher: { name: '조영준', phone: '010-2502-0586' } },
  { id: '85', studentName: '정재민', gradeClass: '초등 2학년2', homeroomTeacher: { name: '김미영', phone: '010-9170-3307' }, coTeacher: { name: '조영준', phone: '010-2502-0586' } },
  { id: '86', studentName: '정재윤', gradeClass: '초등 2학년2', homeroomTeacher: { name: '김미영', phone: '010-9170-3307' }, coTeacher: { name: '조영준', phone: '010-2502-0586' } },
  { id: '87', studentName: '김민결', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '88', studentName: '김시안', gradeClass: '초등 3학년1', homeroomTeacher: { name: '여수일', phone: '010-8653-9447' }, coTeacher: { name: '신혜선', phone: '010-2637-8919' } },
  { id: '89', studentName: '정설원', gradeClass: '초등 3학년2', homeroomTeacher: { name: '김민영1', phone: '010-5142-2410' }, coTeacher: { name: '최정원', phone: '010-5655-1138' } },
  { id: '90', studentName: '고도연', gradeClass: '초등 4학년1', homeroomTeacher: { name: '김재환', phone: '010-6261-5008' }, coTeacher: { name: '박수진', phone: '010-8660-8680' } },
  { id: '91', studentName: '김강준', gradeClass: '초등 4학년1', homeroomTeacher: { name: '김재환', phone: '010-6261-5008' }, coTeacher: { name: '박수진', phone: '010-8660-8680' } },
  { id: '92', studentName: '김소윤', gradeClass: '초등 4학년1', homeroomTeacher: { name: '김재환', phone: '010-6261-5008' }, coTeacher: { name: '박수진', phone: '010-8660-8680' } },
  { id: '93', studentName: '송민결', gradeClass: '초등 4학년1', homeroomTeacher: { name: '김재환', phone: '010-6261-5008' }, coTeacher: { name: '박수진', phone: '010-8660-8680' } },
  { id: '94', studentName: '김재이', gradeClass: '초등 5학년2', homeroomTeacher: { name: '정재은', phone: '010-6644-0504' }, coTeacher: { name: '박주암', phone: '010-6348-9911' } },
  { id: '95', studentName: '김지유', gradeClass: '초등 5학년2', homeroomTeacher: { name: '정재은', phone: '010-6644-0504' }, coTeacher: { name: '박주암', phone: '010-6348-9911' } },
  { id: '96', studentName: '송시온', gradeClass: '초등 5학년1', homeroomTeacher: { name: '김은혜', phone: '010-9145-7695' }, coTeacher: { name: '박지환', phone: '010-8191-7284' } },
  { id: '97', studentName: '모서준', gradeClass: '초등 6학년1', homeroomTeacher: { name: '양주영', phone: '010-4310-2083' }, coTeacher: { name: '노장호', phone: '010-2768-7403' } },
  { id: '98', studentName: '박서우', gradeClass: '초등 6학년1', homeroomTeacher: { name: '양주영', phone: '010-4310-2083' }, coTeacher: { name: '노장호', phone: '010-2768-7403' } },
  { id: '99', studentName: '최준영', gradeClass: '초등 6학년2', homeroomTeacher: { name: '박인숙', phone: '010-9061-4681' }, coTeacher: { name: '박은정', phone: '010-2488-2468' } },
  { id: '100', studentName: '김민서', gradeClass: '중등 1학년1', homeroomTeacher: { name: '천은희', phone: '010-4375-2828' }, coTeacher: { name: '임하나', phone: '010-3604-7815' } },
  { id: '101', studentName: '마옌시', gradeClass: '중등 1학년1', homeroomTeacher: { name: '천은희', phone: '010-4375-2828' }, coTeacher: { name: '임하나', phone: '010-3604-7815' } },
  { id: '102', studentName: '홍서준', gradeClass: '중등 1학년1', homeroomTeacher: { name: '천은희', phone: '010-4375-2828' }, coTeacher: { name: '임하나', phone: '010-3604-7815' } },
  { id: '103', studentName: '김은영', gradeClass: '중등 3학년1', homeroomTeacher: { name: '김아영', phone: '010-8952-9959' }, coTeacher: { name: '김동인', phone: '010-3033-7396' } },
  { id: '104', studentName: '이유주', gradeClass: '고등 1학년2', homeroomTeacher: { name: '박선영', phone: '010-6329-3581' }, coTeacher: { name: '김경옥', phone: '010-6745-4263' } },
  { id: '105', studentName: '김유미', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '106', studentName: '장재형', gradeClass: '고등 2학년2', homeroomTeacher: { name: '김민영2', phone: '010-9585-0806' }, coTeacher: { name: '조은지', phone: '010-2792-2067' } },
  { id: '107', studentName: '김시윤', gradeClass: '고등 3학년1', homeroomTeacher: { name: '유은희', phone: '010-5078-1400' }, coTeacher: { name: '김태호', phone: '010-9215-8626' } },
  { id: '108', studentName: '김은호', gradeClass: '고등 3학년1', homeroomTeacher: { name: '유은희', phone: '010-5078-1400' }, coTeacher: { name: '김태호', phone: '010-9215-8626' } },
  { id: '109', studentName: '김효린', gradeClass: '고등 3학년1', homeroomTeacher: { name: '유은희', phone: '010-5078-1400' }, coTeacher: { name: '김태호', phone: '010-9215-8626' } },
  { id: '110', studentName: '심하늘', gradeClass: '고등 3학년1', homeroomTeacher: { name: '유은희', phone: '010-5078-1400' }, coTeacher: { name: '김태호', phone: '010-9215-8626' } },
  { id: '111', studentName: '조이령', gradeClass: '고등 3학년2', homeroomTeacher: { name: '황신화', phone: '010-7749-7352' }, coTeacher: { name: '이수연', phone: '010-7611-5606' } },
];

// 관리자가 추가한 학생은 브라우저 localStorage에 저장됩니다 (이 브라우저/기기에서만 유지됨).
const CUSTOM_STUDENTS_KEY = 'emercon_custom_students';

// 관리자 모드 전용 비밀번호 (일반 로그인 비밀번호와 다릅니다)
const ADMIN_PASSWORD = '4321';

function loadCustomStudents(): StudentContact[] {
  try {
    const raw = localStorage.getItem(CUSTOM_STUDENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomStudents(students: StudentContact[]) {
  try {
    localStorage.setItem(CUSTOM_STUDENTS_KEY, JSON.stringify(students));
  } catch {
    // localStorage 사용 불가 (프라이빗 모드 등) 시 조용히 무시
  }
}

type View = 'search' | 'admin';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<View>('search');
  const [customStudents, setCustomStudents] = useState<StudentContact[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');

  // 관리자 - 학생 추가 폼 상태
  const [newStudentClass, setNewStudentClass] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [addError, setAddError] = useState('');

  useEffect(() => {
    setCustomStudents(loadCustomStudents());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1324') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
      setAdminPassword('');
    } else {
      setAdminLoginError('관리자 비밀번호가 틀렸습니다.');
    }
  };

  const handleExitAdmin = () => {
    setView('search');
    setIsAdminAuthenticated(false);
    setAdminPassword('');
    setAdminLoginError('');
  };

  // 기존 반 목록과 각 반의 담임/부담임 정보 (반이 같으면 담임/부담임도 같음)
  const classTeacherMap = useMemo(() => {
    const map: Record<string, { homeroomTeacher: StudentContact['homeroomTeacher']; coTeacher?: StudentContact['coTeacher'] }> = {};
    MOCK_DATA.forEach((s) => {
      if (!map[s.gradeClass]) {
        map[s.gradeClass] = { homeroomTeacher: s.homeroomTeacher, coTeacher: s.coTeacher };
      }
    });
    return map;
  }, []);

  const uniqueClasses = useMemo(
    () => Object.keys(classTeacherMap).sort((a, b) => a.localeCompare(b, 'ko')),
    [classTeacherMap]
  );

  // 검색 및 화면 표시에는 기본 데이터 + 관리자가 추가한 학생을 합쳐서 사용
  const allStudents = useMemo(() => [...MOCK_DATA, ...customStudents], [customStudents]);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');

    const trimmedName = newStudentName.trim();
    if (!newStudentClass) {
      setAddError('반을 선택해주세요.');
      return;
    }
    if (!trimmedName) {
      setAddError('학생 이름을 입력해주세요.');
      return;
    }

    const teacherInfo = classTeacherMap[newStudentClass];
    if (!teacherInfo) {
      setAddError('선택한 반의 담임/부담임 정보를 찾을 수 없습니다.');
      return;
    }

    const newStudent: StudentContact = {
      id: `custom-${Date.now()}`,
      studentName: trimmedName,
      gradeClass: newStudentClass,
      homeroomTeacher: teacherInfo.homeroomTeacher,
      coTeacher: teacherInfo.coTeacher,
    };

    const updated = [...customStudents, newStudent];
    setCustomStudents(updated);
    saveCustomStudents(updated);
    setNewStudentName('');
  };

  const handleDeleteCustomStudent = (id: string) => {
    const updated = customStudents.filter((s) => s.id !== id);
    setCustomStudents(updated);
    saveCustomStudents(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">비상연락망</h1>
          <p className="text-gray-600 text-center mb-6 text-sm">개인정보 보호를 위해 비밀번호를 입력해주세요.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 outline-none"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              확인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 검색어에 따른 필터링 (검색어가 비어있으면 빈 배열 반환)
  const filteredStudents = searchTerm.trim() === ''
    ? []
    : allStudents.filter((student) => student.studentName.includes(searchTerm));

  if (view === 'admin' && !isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
          <button
            onClick={handleExitAdmin}
            className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>검색으로 돌아가기</span>
          </button>
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">관리자 모드</h1>
          <p className="text-gray-600 text-center mb-6 text-sm">관리자 전용 비밀번호를 입력해주세요.</p>
          <form onSubmit={handleAdminLogin}>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 outline-none"
              placeholder="관리자 비밀번호 입력"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              autoFocus
            />
            {adminLoginError && <p className="text-red-500 text-sm mb-4">{adminLoginError}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              확인
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-blue-600 text-white p-6 shadow-md sticky top-0 z-10">
          <div className="max-w-md mx-auto flex items-center space-x-3">
            <button
              onClick={handleExitAdmin}
              className="p-2 -ml-2 rounded-full hover:bg-blue-500 transition-colors"
              aria-label="검색으로 돌아가기"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">관리자 모드 - 학생 추가</h1>
          </div>
        </header>

        <main className="max-w-md mx-auto p-4 pb-20 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">반</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                >
                  <option value="">반을 선택하세요</option>
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls} (담임 {classTeacherMap[cls].homeroomTeacher.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">학생 이름</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="학생 이름을 입력하세요"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                />
              </div>

              {addError && <p className="text-red-500 text-sm">{addError}</p>}

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>학생 추가</span>
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              추가된 학생 ({customStudents.length})
            </h2>
            {customStudents.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">아직 추가된 학생이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {customStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{student.studentName}</p>
                      <p className="text-xs text-gray-500">
                        {student.gradeClass} · 담임 {student.homeroomTeacher.name}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCustomStudent(student.id)}
                      className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                      aria-label="삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 헤더 */}
      <header className="bg-blue-600 text-white p-6 shadow-md sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">비상연락망</h1>
            <button
              onClick={() => setView('admin')}
              className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-3 py-2 rounded-full transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>관리자 모드</span>
            </button>
          </div>

          {/* 검색창 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm shadow-sm"
              placeholder="학생 이름을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 (검색 결과) */}
      <main className="max-w-md mx-auto p-4 pb-20">
        {searchTerm.trim() === '' ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">검색할 학생의 이름을 입력해주세요.</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* 학생 정보 헤더 */}
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <span className="font-bold text-lg">{student.studentName}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{student.gradeClass}</span>
                </div>

                {/* 연락처 정보 */}
                <div className="p-5 space-y-4">
                  {/* 담임 선생님 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">담임 선생님</p>
                      <p className="font-medium text-gray-900">{student.homeroomTeacher.name}</p>
                    </div>
                    <a
                      href={`tel:${student.homeroomTeacher.phone.replace(/-/g, '')}`}
                      className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full transition-colors active:scale-95"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="font-bold">{student.homeroomTeacher.phone}</span>
                    </a>
                  </div>

                  {/* 부담임 선생님 (있는 경우만 표시) */}
                  {student.coTeacher && (
                    <>
                      <div className="h-px bg-gray-100 w-full"></div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">부담임 선생님</p>
                          <p className="font-medium text-gray-900">{student.coTeacher.name}</p>
                        </div>
                        <a
                          href={`tel:${student.coTeacher.phone.replace(/-/g, '')}`}
                          className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full transition-colors active:scale-95"
                        >
                          <Phone className="h-4 w-4" />
                          <span className="font-bold">{student.coTeacher.phone}</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">다른 이름으로 검색해보세요.</p>
          </div>
        )}
      </main>
    </div>
  );
}
