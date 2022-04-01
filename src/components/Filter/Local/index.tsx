import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  KeyboardEvent,
  KeyboardEventHandler,
} from 'react';
import { Section, SubTitle } from '../Filter.styled';
import {
  Province,
  City,
  SelectedCityButton,
  UnSelectedCityButton,
  Label,
  SelectedLabel,
  ProvinceMoreUl,
  ProvinceMoreList,
  None,
} from './Local.styled';
import a11yHidden from '@/styles/a11yHidden';

const seoul = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];
const kyungido = [
  '수원시',
  '성남시',
  '의정부시',
  '안양시',
  '부천시',
  '광명시',
  '평택시',
  '동두천시',
  '안산시',
  '고양시',
  '과천시',
  '구리시',
  '남양주시',
  '오산시',
  '시흥시',
  '군포시',
  '의왕시',
  '하남시',
  '용인시',
  '파주시',
  '이천시',
  '안성시',
  '김포시',
  '화성시',
  '광주시',
  '양주시',
  '포천시',
  '여주시',
];
const incheon = [
  '중구',
  '동구',
  '미추홀구',
  '연수구',
  '남동구',
  '부평구',
  '계양구',
  '서구',
];
const busan = [
  '중구',
  '서구',
  '동구',
  '영도구',
  '진구',
  '동래구',
  '남구',
  '북구',
  '해운대구',
  '사하구',
  '금정구',
  '강서구',
  '연제구',
  '수영구',
  '사상구',
];
const daegu = ['중구', '동구', '서구', '남구', '북구', '수성', '달서', '달성'];

const gangwondo = [
  '춘천시',
  '원주시',
  '강릉시',
  '동해시',
  '태백시',
  '속초시',
  '삼척시',
  '홍천군',
  '횡성군',
  '영월군',
  '평창군',
  '정선군',
  '철원군',
  '화천군',
  '양구군',
  '인제군',
  '고성군',
  '양양군',
];

const jungchungdo = [
  '천안시',
  '공주시',
  '보령시',
  '아산시',
  '서산시',
  '논산시',
  '계룡시',
  '당진시',
  '금산군',
  '부여군',
  '서천군',
  '청양군',
  '홍성군',
  '예산군',
  '태안',
];
const jeonlado = [
  '목포시',
  '여수시',
  '순천시',
  '나주시',
  '광양시',
  '담양군',
  '곡성군',
  '구례군',
  '고흥군',
  '보성군',
  '화순군',
  '장흥군',
  '강진군',
  '해남군',
  '영암군',
  '무안군',
  '함평군',
  '영광군',
  '장성군',
  '완도군',
  '진도군',
  '신안군',
];

const provinceList = ['서울', '경기도', '인천', '부산', '더보기'];
const provinceMore = ['강원도', '충청도', '전라도'];

const provinceKorToEng: { [key: string]: string[] } = {
  서울: seoul,
  경기도: kyungido,
  인천: incheon,
  부산: busan,
  대구: daegu,
  강원도: gangwondo,
  충청도: jungchungdo,
  전라도: jeonlado,
};

interface PropsType {
  local: string[];
  setLocal: React.Dispatch<React.SetStateAction<string[]>>;
}

const Local = ({ local, setLocal }: PropsType) => {
  // province: 도, city: 시
  const [curProvince, setCurProvince] = useState<string>('서울');
  const [curCity, setCurCity] = useState<string[]>(seoul);
  const [onMoreButton, setOnMoreButton] = useState<boolean>(false);

  // 외부의 클릭 이벤트를 위한 ref
  const WrapperRef = useRef<HTMLUListElement>(null);
  const provinceMoreRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (WrapperRef.current === e.target) {
        setOnMoreButton(false);
        return;
      }
      if (WrapperRef.current && !WrapperRef.current.contains(e.target)) {
        setOnMoreButton(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [WrapperRef]);

  const onClick = (e: MouseEvent<HTMLElement>) => {
    let TEXT = (e.target as HTMLLIElement).textContent as string;
    if (TEXT === '더보기') {
      onMoreButton ? setOnMoreButton(false) : setOnMoreButton(true);
    } else {
      setCurCity(provinceKorToEng[TEXT]);
      setOnMoreButton(false);
    }
    if (provinceMore.includes(TEXT)) setCurProvince('더보기');
    else setCurProvince(TEXT);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    let TEXT = (e.target as HTMLLIElement).textContent as string;
    if (e.key === 'Enter' && provinceMore.includes(TEXT)) {
      setCurProvince(TEXT);
      setCurCity(provinceKorToEng[TEXT]);
      onMoreButton ? setOnMoreButton(false) : setOnMoreButton(true);
      provinceMoreRef.current && provinceMoreRef.current.focus();
    }
  };

  const checkDuplicatedCity = (City: string) => {
    if (local.includes(City)) {
      let temp_local = [...local];
      temp_local = temp_local.filter((e) => e !== City);
      setLocal([...temp_local]);
    } else {
      let set = new Set([...local, City]);
      set && setLocal([...(set as any)]);
    }
  };

  const onClickLabel = (e: MouseEvent<HTMLElement>) => {
    let City = (e.target as HTMLLIElement).textContent;
    City && checkDuplicatedCity(City);
  };

  const onKeyUpLabel = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') {
      let City = (e.target as HTMLLIElement).textContent;
      City && checkDuplicatedCity(City);
    }
  };

  return (
    <section css={Section}>
      <SubTitle>지역</SubTitle>
      <div css={Province} onClick={onClick} onKeyUp={onKeyUp}>
        {provinceList.map((province: string) => (
          // <CityButton>
          <button
            ref={provinceMoreRef}
            css={
              curProvince === province
                ? SelectedCityButton
                : UnSelectedCityButton
            }
            key={province}
            tabIndex={0}
          >
            {province}
          </button>
        ))}
        <ul ref={WrapperRef} css={onMoreButton ? ProvinceMoreUl : None}>
          {onMoreButton &&
            provinceMore.map((province) => (
              <li css={ProvinceMoreList} key={province} tabIndex={0}>
                {province}
              </li>
            ))}
        </ul>
      </div>

      <div css={City}>
        {curCity.map((city) => {
          return (
            <li key={city}>
              {/* 체크박스 선택시 로직 추가해야함 */}
              <label
                htmlFor={city}
                css={local.includes(city) ? SelectedLabel : Label}
                onClick={onClickLabel}
                onKeyUp={onKeyUpLabel}
                tabIndex={0}
              >
                {city}
              </label>
              <input
                id={city}
                value={city}
                type="checkbox"
                css={a11yHidden}
                tabIndex={-1}
              ></input>
            </li>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(Local);
