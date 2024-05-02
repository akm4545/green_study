const adminNotice = {
	envMan: {
		apiDomain:"http://localhost:8080/",
	},
	
	requestMan: {
		noticeList: async(page, searchCondition, searchKeyword) => {
			let rqResult = await fetch(adminNotice.envMan.apiDomain + `admin/notice?page=${page !== undefined ? page : '1'}
			${searchCondition !== undefined ? `&searchCondition=${searchCondition}` : ``}
			${searchKeyword !== undefined ? `&searchKeyword=${searchKeyword}` : ``}`);
			
            let result = await rqResult.json();

			console.log(result);
                        
            return result;
		},
		
		noticeSelect: async(noticeKey) => {
			let rqResult = await fetch(adminNotice.envMan.apiDomain + `admin/notice/${noticeKey}`);
			let result = await rqResult.json();
                        
            return result;
		},
		
		noticeDelete: async(noticeKey) => {
			let rqResult = await fetch(adminNotice.envMan.apiDomain + `admin/notice/${noticeKey}`, {
				method: "DELETE"
			});
			let result = await rqResult.json();
                        
            return result;
		},
		
		noticeUpdate: async(noticeKey, title, content) => {
			let rqResult = await fetch(adminNotice.envMan.apiDomain+`admin/notice/${noticeKey}`, {
				method: "PUT",
				headers: {
    				'Content-Type': 'application/json;charset=utf-8'
  				},
  				body: JSON.stringify({
					title: title,
					content: content
				})
			});
			let result = await rqResult.json();
                        
            return result;
		},
		
		noticeInsert: async(title, content) => {
			let rqResult = await fetch(adminNotice.envMan.apiDomain+`admin/notice`, {
				method: "POST",
				headers: {
    				'Content-Type': 'application/json;charset=utf-8'
  				},
  				body: JSON.stringify({
					title: title,
					content: content
				})
			});
			let result = await rqResult.json();
                        
            return result;
		},
	},
	
	viewMan: {
		adminNoticeMain: (data) => {
			adminNotice.funcMan.nodeClean();

			let keyArr = new Array("noticeKey", "title", "content", "registerDate", "views");
			let removeTr = document.getElementsByClassName("odd")[0];
			let noticeTable = document.getElementById("notice_table");
			let searchBtn = document.getElementsByClassName("btn_search")[0];
			
			if(removeTr){
				removeTr.parentNode.removeChild(removeTr);				
			}
			
			data.noticeList.forEach(notice => {
				let tr = document.createElement("tr");
				
				tr.classList.add("createTrNode");
				tr.style.cursor = "pointer";
				
				keyArr.forEach(key => {
					let td = document.createElement("td");
					if(key === "registerDate"){
						td.innerText = notice[key].substring(0, 11);
					}else{
						td.innerText = notice[key];						
					}
					
					tr.appendChild(td);
					
					noticeTable.appendChild(tr);
				});
				
				tr.onclick = () => {
					location.href = adminNotice.envMan.apiDomain + `admin/notice/noticeInfo/${notice.noticeKey}`;					
				};
			});
			
			searchBtn.onclick = () => adminNotice.eventMan.noticeSearch();
			
			adminNotice.funcMan.pagination(data);
			adminNotice.funcMan.sideMenuLink();
		},
		
		adminNoticeInfo: (data) => {
			let titleInput = document.getElementById("title");
			let registerDateDiv = document.getElementById("registerDate");
			let deleteDateDiv = document.getElementById("deleteDate");
			let contentText = document.getElementById("contentText");
			let deleteBtn = document.getElementsByClassName("btn_delete")[0];
			let updateBtn = document.getElementsByClassName("right")[0];
			
			titleInput.value = data.title;
			registerDateDiv.innerText = data.registerDate.substring(0, 11);
			deleteDateDiv.innerText = data.deleteDate ? data.deleteDate.substring(0, 11) : "X";
			contentText.value = data.content;
			
			titleInput.disabled = true;
			contentText.disabled = true;
			
			if(data.deleteDate){
				deleteBtn.style.display = "none";
				updateBtn.style.display = "none";
			}else{
				deleteBtn.onclick = async () => {
					if(confirm("정말 삭제하시겠습니까?")){
						let deleteData = await adminNotice.requestMan.noticeDelete(data.noticeKey);
						adminNotice.viewMan.adminNoticeInfo(deleteData);
					}
				};
			}
			
			updateBtn.onclick = async (e) => {
				let sw = e.target.classList.contains("updateCheck");
				
				if(sw){
					if(!titleInput.value){
						alert("제목을 입력하세요.");
						titleInput.focus();
						
						return;
					}else if(!contentText.value){
						alert("내용을 입력하세요.");
						contentText.focus();
						
						return;
					}
					
					if(confirm("수정하시겠습니까?")){
						let updateDate = await adminNotice.requestMan.noticeUpdate(data.noticeKey, titleInput.value, contentText.value);
						alert("수정하였습니다.");
						adminNotice.viewMan.adminNoticeInfo(updateDate);						
					}
				}else{
					e.target.classList.add("updateCheck");
					
					titleInput.disabled = false;
					contentText.disabled = false;
				}
			};
			
			adminNotice.funcMan.sideMenuLink();
		},
		
		adminNoticeAdd:() => {
			let noticeTitle = document.getElementById("notice_title");
			let tr = document.querySelectorAll("#dataTable2 tbody tr");
			let updateBtn = document.getElementsByClassName("right")[0];
			let deleteBtn = document.getElementsByClassName("btn_delete")[0];
			let buttonContainer = document.getElementsByClassName("btn_sort")[0];
			
			let insertBtn = document.createElement("button");
			
			noticeTitle.innerText = "공지사항 등록 페이지 입니다.";
			insertBtn.innerText = "입력";
			
			tr[1].parentNode.removeChild(tr[1]);
			tr[2].parentNode.removeChild(tr[2]);
			
			updateBtn.style.display = "none";
			deleteBtn.style.display = "none";
			insertBtn.classList.add("btn_search");
			
			buttonContainer.appendChild(insertBtn);
			
			insertBtn.onclick = async () => {
				let title = document.getElementById("title").value;
				let content = document.getElementById("contentText").value;
				
				if(!title){
					alert("제목을 입력하세요.");
					document.getElementById("title").focus();
					return;
				}else if(!content){
					alert("내용을 입력하세요.");
					document.getElementById("contentText").focus();
					return;
				}
				
				if(confirm("정말 입력하시겠습니까?")){
					let insertData = await adminNotice.requestMan.noticeInsert(title, content);
					
					location.href = adminNotice.envMan.apiDomain + `admin/notice/noticeInfo/${insertData.noticeKey}`;
				}
			};
			
			adminNotice.funcMan.sideMenuLink();
		}
	},
	
	funcMan: {
		nodeClean: () => {
			let container = document.querySelector('table.api_data_table tbody');
			let userElements = container.getElementsByClassName("createTrNode");
			let pageContainer = document.querySelector('.pagination');
			let pageElements = pageContainer.getElementsByClassName("createPage");

			while (userElements[0]) {
    			userElements[0].parentNode.removeChild(userElements[0]);
			}

			while (pageElements[0]) {
    			pageElements[0].parentNode.removeChild(pageElements[0]);
			}
		},

		pagination: async (data) => {
			let pageEnd = data.search.pageSize + data.search.page - 1;
			pageEnd = pageEnd >= data.search.totalPageCnt ? data.search.totalPageCnt : pageEnd;

			let startPage = data.search.page + data.search.pageSize - 1 > data.search.totalPageCnt ? data.search.totalPageCnt - data.search.pageSize + 1: data.search.page;
			startPage = startPage <= 0 ? data.search.startPage : startPage;

			for(let i=startPage; i<=pageEnd; i++){
				let pageLi = document.createElement("li");
				let pageA = document.createElement("a");

				pageLi.classList.add("paginate_button");
				pageLi.classList.add("page-item");
				pageLi.classList.add("createPage");

				if(i === data.search.page){
					pageLi.classList.add("active");
				}else{
					pageLi.style.cursor = "pointer"
				}

				pageA.classList.add("page-link");
				pageA.innerText = i;
				pageA.addEventListener('click',async () => {
					adminNotice.funcMan.nodeClean();

					if(data.search.searchUseYn === 'Y'){
						data = await adminNotice.requestMan.noticeList(i, data.search.searchCondition, data.search.searchKeyword);
					}else{
						data = await adminNotice.requestMan.noticeList(i);
					}

					adminNotice.viewMan.adminNoticeMain(data);
				});

				pageLi.appendChild(pageA);
				document.querySelector(".pagination").insertBefore(pageLi, document.querySelector("#dataTable_next"));
			}

			if(data.search.page !== 1){
				document.getElementsByClassName("previous")[0].classList.remove("disabled");

				if(!document.getElementsByClassName("previous")[0].classList.contains("preEventOn")){
					document.getElementsByClassName("previous")[0].classList.add("preEventOn");

					document.getElementsByClassName("previous")[0].addEventListener('click',async () => {
						adminNotice.funcMan.nodeClean();

						if(data.search.searchUseYn === 'Y'){
							data = await adminNotice.requestMan.noticeList(data.search.page - 1, data.search.searchCondition, data.search.searchKeyword);
						}else{
							data = await adminNotice.requestMan.noticeList(data.search.page - 1);
						}
						adminNotice.viewMan.adminNoticeMain(data);

					});
				}
			}

			if(data.search.page !== data.search.totalPageCnt){
				document.getElementsByClassName("next")[0].classList.remove("disabled");

				document.getElementsByClassName("next")[0].onclick = async () => {
					adminNotice.funcMan.nodeClean();

					if(data.search.searchUseYn === 'Y'){
						data = await adminNotice.requestMan.noticeList(data.search.page + 1, data.search.searchCondition, data.search.searchKeyword);
					}else{
						data = await adminNotice.requestMan.noticeList(data.search.page + 1);
					}
					adminNotice.viewMan.adminNoticeMain(data);
				};
			}

			if(data.search.page === 1){
				document.getElementsByClassName("previous")[0].classList.add("disabled");
			}

			if(data.search.page === data.search.totalPageCnt || data.search.totalPageCnt === 0){
				document.getElementsByClassName("next")[0].classList.add("disabled");
			}
		},
		
		sideMenuLink: () => {
			document.getElementById("main").href = adminNotice.envMan.apiDomain;
			document.getElementById("user_list").href = adminNotice.envMan.apiDomain + `admin/userList`;
			document.getElementById("notice_manage").href = adminNotice.envMan.apiDomain + `admin/notice/noticeMain`;
			document.getElementById("notice_add").href = adminNotice.envMan.apiDomain + `admin/notice/noticeAdd`;
			document.getElementById("hashtag").href = adminNotice.envMan.apiDomain + `admin/hashtagMain`;
			document.getElementById("eventMain").href = adminNotice.envMan.apiDomain + `admin/eventMain`;
			document.getElementById("productMain").href = adminNotice.envMan.apiDomain + `admin/product`; 
			document.getElementById("productAdd").href = adminNotice.envMan.apiDomain + `admin/product/insert`;
			document.getElementById("orderMain").href = adminNotice.envMan.apiDomain + `admin/orderMain`;
			document.getElementById("cancelMain").href = adminNotice.envMan.apiDomain + `admin/cancelMain`;
			document.getElementById("coupon_main").href = adminNotice.envMan.apiDomain + `admin/couponMain`;
			document.getElementById("coupon_add").href = adminNotice.envMan.apiDomain + `admin/couponAdd`;
			document.getElementById("pointMain").href = adminNotice.envMan.apiDomain + `admin/pointMain`;
			document.getElementById("pointPolicy").href = adminNotice.envMan.apiDomain + `admin/pointPolicySetting`;
			document.getElementById("adManagement").href = adminNotice.envMan.apiDomain + `admin/ad/select`;
			document.getElementById("peterior").href = adminNotice.envMan.apiDomain + `admin/peteriorList`;
			document.getElementById("deliveryPolicy").href = adminNotice.envMan.apiDomain + `admin/deliveryPolicyMain`;
			document.getElementById("petProblem").href = adminNotice.envMan.apiDomain + `admin/petProblemMain`;
			document.getElementById("terms").href = adminNotice.envMan.apiDomain + `admin/termsMain`;
			document.getElementById("company").href = adminNotice.envMan.apiDomain + `admin/companyMain`;
		}
	},
	
	eventMan: {
		noticeSearch: async () => {
			let searchCondition = document.getElementById("searchCondition").value;
			let searchKeyword = document.getElementById("searchKeyword").value;
			
			if(!searchKeyword){
				alert("검색어를 입력하세요.");
				return;
			}
			
			let searchData = await adminNotice.requestMan.noticeList(1, searchCondition, searchKeyword);
			adminNotice.viewMan.adminNoticeMain(searchData);
		},
	},
	
	adminNoticeMain: async () => {
		let data = await adminNotice.requestMan.noticeList();
		
		adminNotice.viewMan.adminNoticeMain(data);
	},
	
	adminNoticeInfo: async (url) => {
		if(url.indexOf("noticeAdd") !== -1){
			adminNotice.viewMan.adminNoticeAdd();
		}else{
			let data = await adminNotice.requestMan.noticeSelect(url.substring(url.lastIndexOf('/') + 1));
		
			adminNotice.viewMan.adminNoticeInfo(data);	
		}
	},
}