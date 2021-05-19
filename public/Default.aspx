<%@ Page Language="C#" %>
<!DOCTYPE html>
<script language="c#" runat="server">
    public void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();

        if (!Page.IsPostBack)
        {
            Response.WriteFile("index.html");
        }
    }

</script>
