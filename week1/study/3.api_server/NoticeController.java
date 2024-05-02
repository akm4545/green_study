@Controller
public class NoticeController {

    @Resource(name = "noticeService")
    private NoticeService noticeService;
    
    private static final String SAVE_PATH = "/upload";
	
    @RequestMapping(value="/notice/NoticeList.do")
    public List<NoticeVO> selectNoticeList(@ModelAttribute("searchVO") NoticeDefaultVO searchVO, ModelMap model, NoticeVO vo) throws Exception {
    	// ...
        return selectNoticeList;
    } 
    
    @PutMapping("/notice/updateNoticeType.do")
    public void noticeTypUpdate(int noticeNo, String type ) {
    	HashMap<Object, Object> typeUpdate = new HashMap<Object, Object>();
    	
    	typeUpdate.put("noticeKey", noticeNo);
    	typeUpdate.put("type", type);
    	
    	System.out.println(typeUpdate);
    	noticeService.updateNoticeType(typeUpdate);
    }

    @RequestMapping("/notice/selectNotice.do")
    public @ModelAttribute("noticeVO")  NoticeVO selectNotice( NoticeVO noticeVO, @ModelAttribute("searchVO") NoticeDefaultVO searchVO, int noticeNo, HttpServletRequest req) throws Exception {
    	

    	NoticeVO selectNotice = noticeService.selectNotice(noticeNo);
    	
    	
  
        return selectNotice;
    }
}