@Component
public class AuthorizationExtractor {

    public String extract(HttpServletRequest request, String type) {
        Enumeration<String> headers = request.getHeaders(HttpHeaders.AUTHORIZATION);
        while (headers.hasMoreElements()) {
            String value = headers.nextElement();
            if (value.toLowerCase().startsWith(type.toLowerCase())) {
                return value.substring(type.length()).trim();
            }
        }
        return Strings.EMPTY;
    }
}