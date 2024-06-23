const apiUrl = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20240101&endde=20240622&upkind=417000&pageNo=1&numOfRows=8&serviceKey=kXPwQObSwiYk4AuACxK0tdE3DB7fNohcoPRVhHgVGfdDCrrRkZEsLrrrzhrpsibLzqYO0PT4wyUi4/BGuWWrZw=='; // 실제 API URL 입력

// 강아지 정보를 나열할 요소 선택
const dogListContainer = document.getElementById('dog-list');

// API에서 XML 데이터 가져오기
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 정상적이지 않습니다');
        }
        return response.text();
    })
    .then(xmlText => {
        // XML 데이터를 JavaScript 객체로 변환
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        // 각 item을 반복하면서 강아지 정보를 나열
        items.forEach(item => {
            const filename = item.querySelector('filename').textContent;
            const happenPlace = item.querySelector('happenPlace').textContent;
            const kindCd = item.querySelector('kindCd').textContent;
            const newKindcd2 = kindCd.substring(3);
            const age = item.querySelector('age').textContent;
            const weight = item.querySelector('weight').textContent;

            // 강아지 정보를 나타내는 HTML 구성
            const dogInfoHTML = `
                <div class="dog-info">
                    <img src="${filename}" alt="${kindCd}">
                    <h3>${newKindcd2}</h3>
                    <p><strong>발견 장소:</strong> ${happenPlace}</p>
                    <p><strong>나이:</strong> ${age}</p>
                    <p><strong>체중:</strong> ${weight}</p>
                </div>
            `;

            // dogListContainer에 추가
            dogListContainer.innerHTML += dogInfoHTML;
        });
    })
    .catch(error => {
        console.error('API 오류:', error);
        // 오류를 적절히 처리합니다. 예를 들어 사용자에게 메시지를 표시할 수 있습니다.
    });
