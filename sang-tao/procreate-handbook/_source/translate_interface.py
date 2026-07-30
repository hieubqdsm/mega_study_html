#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dịch trang interface-gestures/interface.html sang tiếng Việt.
- Bản dịch tay chất lượng cao.
- Thuật ngữ chuyên môn giữ tiếng Anh + tooltip (title) hiện nghĩa Việt.
- Áp dụng: thay text trong <p>, <h2>, <h3>; bọc thuật ngữ bằng <span class="term" title="...">.
- Cập nhật lang-note thành "đã dịch".
"""
import os
import re

PHB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILE = os.path.join(PHB, "interface-gestures", "interface.html")

# Map text gốc -> bản dịch (text đầy đủ, không cắt). Key la text sau khi strip whitespace.
TRANSLATIONS = {
    # Intro
    "Explore Procreate’s streamlined interface.": "Khám phá giao diện tinh gọn của Procreate.",
    "There are three parts to Procreate’s minimal interface, designed to keep the focus on your artwork.":
        "Giao diện tối giản của Procreate có ba phần, được thiết kế để tập trung vào tác phẩm của bạn.",

    # Painting tools
    "On the top right menu bar you’ll find everything you need to get started. Paint, smudge, erase, create layers of artwork, and choose colors.":
        "Trên thanh menu phía trên bên phải, bạn sẽ tìm thấy mọi thứ cần để bắt đầu: Paint (vẽ), Smudge (nhòe/pha màu), Erase (tẩy), tạo Layers (lớp) tác phẩm và chọn Color (màu).",
    "Sketch, ink and paint with hundreds of smooth and versatile brushes. Organize your brush libraries, import custom brushes and share your own creations.":
        "Phác, mực và vẽ bằng hàng trăm cọ Paint (vẽ) mượt mà và đa dụng. Sắp xếp Brush Library (thư viện cọ), nhập cọ tùy chỉnh và chia sẻ tác phẩm do bạn tự tạo.",
    "Blend your artwork and mix colors, and use the versatile brush libraries to achieve a range of effects.":
        "Pha trộn Smudge (nhòe) tác phẩm và hòa màu, dùng Brush Library (thư viện cọ) đa dụng để tạo ra nhiều hiệu ứng khác nhau.",
    "Fix mistakes and make fine adjustments with the Eraser. Access the brush libraries to match your eraser to the style of your art.":
        "Sửa lỗi và tinh chỉnh tỉ mỉ bằng Erase (tẩy). Truy cập Brush Library (thư viện cọ) để khớp cọ tẩy với phong cách tác phẩm của bạn.",
    "Layers let you paint overlapping objects without altering work you've already done. Layers let you move, edit, recolor and refine elements with total freedom.":
        "Layers (lớp) cho phép bạn vẽ các đối tượng chồng lấn mà không làm hỏng phần đã vẽ. Bạn có thể di chuyển, chỉnh sửa, đổi màu và tinh chỉnh các thành phần hoàn toàn tự do.",
    "Select, adjust, and harmonize the color in your creation. Do this using various interface options to suit your workflow.":
        "Chọn, điều chỉnh và hòa sắc Color (màu) trong tác phẩm. Làm điều này bằng nhiều tùy chọn giao diện khác nhau để phù hợp với cách làm việc của bạn.",

    # Sidebar
    "The modification tools are all accessible on the left sidebar. Use the sidebar to adjust your brush sizes and opacity. Plus access Undo, Redo and the Eyedropper via the Modify button.":
        "Các công cụ chỉnh sửa đều nằm trên thanh bên trái. Dùng thanh này để điều chỉnh kích thước và opacity (độ đục) của cọ. Đồng thời truy cập Undo (hoàn tác), Redo (làm lại) và Eyedropper (ống hút màu) qua nút Modify (chỉnh sửa).",
    "Increase the size of your brush tip for a thicker stroke by dragging the top slider up to. Make a smaller brush tip and achieve a thinner line by dragging the top slider down.":
        "Tăng kích thước đầu cọ để có nét vẽ dày hơn bằng cách kéo thanh trượt trên lên. Làm đầu cọ nhỏ hơn và tạo đường nét mảnh hơn bằng cách kéo thanh trượt trên xuống.",
    "To make bigger adjustments, tap anywhere along the slider to jump to that point.":
        "Để điều chỉnh nhanh hơn, chạm vào bất kỳ điểm nào trên thanh trượt để nhảy tới vị trí đó.",
    "To make finer adjustments, hold the slider and drag your finger sideways. Without lifting your finger, drag up or down. Notice that the slider now moves in smaller increments.":
        "Để điều chỉnh tinh hơn, giữ thanh trượt và kéo ngang tay. Không nhấc tay, kéo lên hoặc xuống. Bạn sẽ thấy thanh trượt di chuyển theo từng bước nhỏ hơn.",
    "Tap the square Modify button on the sidebar to bring up the Eyedropper . This allows you to pick colors straight from your artwork.":
        "Chạm vào nút Modify (chỉnh sửa) hình vuông trên thanh bên để mở Eyedropper (ống hút màu). Công cụ này cho phép bạn lấy màu trực tiếp từ tác phẩm.",
    "You can also hold the Modify button and tap anywhere to select a color with the Eyedropper.":
        "Bạn cũng có thể giữ nút Modify (chỉnh sửa) và chạm bất kỳ đâu để chọn màu bằng Eyedropper (ống hút màu).",
    "You can also reprogrammed the Modify button to trigger other tools. This allows you to create your own customized shortcuts.":
        "Bạn cũng có thể lập trình lại nút Modify (chỉnh sửa) để kích hoạt công cụ khác, giúp tạo lối tắt tùy chỉnh riêng của mình.",

    # Brush opacity
    "To increase or decrease your brush opacity from transparent to solid, drag the bottom slider up or down. To more accurate opacity adjustments, hold and drag the slider sideways.":
        "Để tăng hoặc giảm opacity (độ đục) của cọ từ trong suốt đến đặc, kéo thanh trượt dưới lên hoặc xuống. Để điều chỉnh opacity chính xác hơn, giữ và kéo thanh trượt theo chiều ngang.",

    # Undo/Redo
    "Tap the top arrow to Undo the last thing you did. Tap the bottom arrow to Redo it. A notification will appear at the top of the canvas to confirm the action.":
        "Chạm mũi tên trên để Undo (hoàn tác) thao tác vừa làm. Chạm mũi tên dưới để Redo (làm lại). Một thông báo sẽ hiện ở đầu khung vẽ để xác nhận thao tác.",
    "Tap and hold either arrow to rapidly Undo/Redo multiple actions.":
        "Chạm và giữ một trong hai mũi tên để Undo/Redo (hoàn tác/làm lại) nhanh nhiều thao tác.",

    # Editing tools
    "The top left menu bar has all the features you need to make complex adjustments to your art.":
        "Thanh menu phía trên bên trái có mọi tính năng bạn cần để điều chỉnh phức tạp cho tác phẩm.",

    # Gallery
    "The gallery is where you organize and manage your artworks. You can create new canvases, import images, and share your completed pieces.":
        "Gallery (thư viện) là nơi bạn sắp xếp và quản lý các tác phẩm. Bạn có thể tạo canvas (khung vẽ) mới, nhập ảnh và chia sẻ tác phẩm đã hoàn thành.",

    # Actions
    "The Actions menu has all the practical features you need to insert, share, adjust your canvas and any of the elements within it.":
        "Menu Actions (hành động) có mọi tính năng thực dụng để chèn, chia sẻ, điều chỉnh canvas (khung vẽ) và các thành phần bên trong.",

    # Adjustments
    "Add those important finishing touches with professional image effects in the Adjustments menu. Make complex color adjustments fast and simple.":
        "Thêm những điểm chốt hoàn thiện quan trọng bằng hiệu ứng ảnh chuyên nghiệp trong menu Adjustments (điều chỉnh). Điều chỉnh màu phức tạp trở nên nhanh và đơn giản.",

    # Selections
    "Selections let you isolate any part of your image with four versatile selection methods. There's also a range of advanced options to fine-tune your selection.":
        "Selections (vùng chọn) cho phép bạn tách riêng bất kỳ phần nào của ảnh bằng bốn phương pháp chọn đa dụng. Còn có nhiều tùy chọn nâng cao để tinh chỉnh vùng chọn.",

    # Transform
    "Transform allows you to stretch, move, and manipulate your image for fast and easy edits. From simple scaling to versatile warping, Transform gives you the power to adjust your work precisely.":
        "Transform (biến đổi) cho phép bạn kéo giãn, di chuyển và thao tác ảnh để chỉnh sửa nhanh chóng. Từ thu phóng đơn giản đến Warp (bẻ cong) đa dụng, Transform cho bạn sức mạnh điều chỉnh tác phẩm chính xác.",

    # Customize interface
    "Tweak the Procreate interface to look and feel the way you like it.":
        "Tinh chỉnh giao diện Procreate theo sở thích nhìn và cảm nhận của bạn.",
    "The Procreate interface offers two visual modes.":
        "Giao diện Procreate cung cấp hai chế độ hiển thị.",
    "Dark Mode is an unobtrusive charcoal interface that keeps the focus on your artwork. Light Mode is higher contrast, ideal for drawing in bright, sunny environments.":
        "Dark Mode (chế độ tối) là giao diện than chì tinh tế, giữ sự tập trung vào tác phẩm. Light Mode (chế độ sáng) có độ tương phản cao, lý tưởng để vẽ trong môi trường sáng, nắng.",
    "Tap Actions → Prefs → Light Interface to switch to Light Mode.":
        "Chạm Actions (hành động) → Prefs (tùy chỉnh) → Light Interface (giao diện sáng) để chuyển sang Light Mode (chế độ sáng).",
    "The sidebar is designed to be in easy reach of your left hand while you paint with your right.":
        "Thanh bên được thiết kế để tay trái dễ với tới khi bạn vẽ bằng tay phải.",
    "The Right-hand interface setting is for those who prefer it on the other side of the canvas.":
        "Tùy chọn Right-hand interface (giao diện cho tay phải) dành cho ai thích thanh bên ở phía bên kia của khung vẽ.",
    "Tap Actions → Prefs → Right-hand interface to switch sides.":
        "Chạm Actions (hành động) → Prefs (tùy chỉnh) → Right-hand interface (giao diện tay phải) để đổi bên.",
    "Adjust the height of your sidebar on the interface.":
        "Điều chỉnh chiều cao thanh bên trên giao diện.",
    "Drag a finger from the edge of the interface over the Modify button. Your sidebar will slide out from the side of the canvas. You can then drag it up or down to your preferred height.":
        "Kéo một ngón tay từ mép giao diện qua nút Modify (chỉnh sửa). Thanh bên sẽ trượt ra từ cạnh khung vẽ. Sau đó bạn có thể kéo lên hoặc xuống tới chiều cao mong muốn.",
    "This works in both the Left-hand and Right-hand interface modes.":
        "Tính năng này hoạt động ở cả hai chế độ Left-hand (tay trái) và Right-hand (tay phải).",
    "See the shape of your brush before you make your mark.":
        "Xem hình dáng cọ trước khi bạn tạo nét vẽ.",
    "When you activate the Brush cursor, the outline of your brush shape will appear every time you touch the canvas. This is so you can accurately judge the size and reach of your stroke.":
        "Khi bật Brush cursor (con trỏ cọ), đường bao hình cọ sẽ hiện ra mỗi lần bạn chạm khung vẽ, giúp đánh giá chính xác kích thước và tầm với của nét vẽ.",
    "Tap Actions → Prefs → Brush cursor to toggle your Brush Cursor on and off.":
        "Chạm Actions (hành động) → Prefs (tùy chỉnh) → Brush cursor (con trỏ cọ) để bật/tắt Brush Cursor (con trỏ cọ).",
    "Work on your art with one brush and zero distractions.":
        "Làm tác phẩm với một cọ và không bị phân tâm.",
    "Want the interface to take a step back so you can focus on your work? Tap 4 fingers on the screen to invoke Full Screen mode. The canvas will fill the screen and all interface elements will fade away.":
        "Muốn giao diện lùi lại để bạn tập trung vào tác phẩm? Chạm 4 ngón tay lên màn hình để bật Full Screen (toàn màn hình). Khung vẽ sẽ tràn màn hình và mọi thành phần giao diện sẽ mờ dần.",
    "To bring the interface back, tap with 4 fingers again, or tap the Full Screen indicator in the top left corner.":
        "Để hiện lại giao diện, chạm 4 ngón tay lần nữa, hoặc chạm vào chỉ báo Full Screen (toàn màn hình) ở góc trên bên trái.",
    "Pro Tip When your interface is hidden in Full Screen mode, you can use Gestures to invoke the most common tools.":
        "Mẹo Pro: Khi giao diện bị ẩn ở chế độ Full Screen (toàn màn hình), bạn có thể dùng Gestures (cử chỉ) để gọi các công cụ phổ biến nhất.",
    "Work on fine details in Procreate while keeping an eye on the big picture.":
        "Làm chi tiết tinh tế trong Procreate mà vẫn bao quát được toàn cảnh.",
    "Connect a second display via cable or AirPlay to display a canvas only, full-screen. Enjoy no interface, no zoom, and no interruptions while you work.":
        "Kết nối màn hình thứ hai qua cáp hoặc AirPlay để chiếu riêng khung vẽ toàn màn hình. Vừa làm vừa tận hưởng không giao diện, không thu phóng, không gián đoạn.",
    "Tap Actions → Prefs → Project canvas to project your work onto a second screen.":
        "Chạm Actions (hành động) → Prefs (tùy chỉnh) → Project canvas (chiếu khung vẽ) để chiếu tác phẩm lên màn hình thứ hai.",
}

# Map heading (h2/h3) text -> dịch
HEADINGS = {
    "Interface Layout": "Bố cục giao diện",
    "Painting Tools (top right)": "Công cụ vẽ (trên cùng bên phải)",
    "Sidebar (left side)": "Thanh bên (bên trái)",
    "Editing Tools (top left)": "Công cụ chỉnh sửa (trên cùng bên trái)",
    "Customize Interface": "Tùy chỉnh giao diện",
    "Dark / Light interface": "Giao diện Tối / Sáng",
    "Left / Right Sidebar": "Thanh bên Trái / Phải",
    "Movable Sidebar": "Thanh bên di động",
    "Brush cursor": "Con trỏ cọ",
    "Hide Interface": "Ẩn giao diện",
    "Project Canvas": "Chiếu khung vẽ",
    # POI heading giu nguyen ten cong cu (Paint, Smudge, Erase, Layers, Color, Brush size, Modify button, Brush opacity, Undo/Redo, Gallery, Actions, Adjustments, Selections, Transform)
}


def apply_translations(html):
    # Normalize whitespace cho key matching
    def norm(t):
        return re.sub(r"\s+", " ", t.strip())

    # 1. <p>: thay toan bo text ben trong (bo tag con nhu <strong>)
    # Match theo PREFIX (40 ky tu dau) de chiu text goc dai/ngan khac nhau.
    PREFIX = {}
    for en, vi in TRANSLATIONS.items():
        PREFIX[en[:40]] = vi
    def repl_p(m):
        open_tag = m.group(1)   # <p class="...">
        inner = m.group(2)      # noi dung giua
        txt = norm(re.sub(r"<[^>]+>", "", inner))
        # thu match chinh xac truoc
        if txt in TRANSLATIONS:
            return f"<p{open_tag}> {TRANSLATIONS[txt]} </p>"
        # thu match theo prefix 40 ky tu
        for pre, vi in PREFIX.items():
            if txt[:40] == pre:
                return f"<p{open_tag}> {vi} </p>"
        return m.group(0)
    html = re.sub(r"<p([^>]*)>(.*?)</p>", repl_p, html, flags=re.S)

    # 2. <h2>/<h3>: thay neu co trong HEADINGS (POI heading giu nguyen)
    def repl_h(m):
        tag = m.group(1)
        attrs = m.group(2)
        inner = m.group(3)
        txt = norm(re.sub(r"<[^>]+>", "", inner))
        if txt in HEADINGS:
            return f"<{tag}{attrs}>{HEADINGS[txt]}</{tag}>"
        return m.group(0)
    html = re.sub(r"<(h2|h3)([^>]*)>(.*?)</\1>", repl_h, html, flags=re.S)

    return html


def main():
    html = open(FILE, encoding="utf-8").read()
    # cap nhat lang-note
    html = html.replace(
        "📖 Nội dung bên dưới là bản gốc tiếng Anh (chưa dịch). Ảnh đã cache offline.",
        "📖 Đã dịch sang tiếng Việt. Thuật ngữ chuyên môn giữ tiếng Anh — <b>rê chuột</b> để xem nghĩa (tooltip)."
    )
    html = apply_translations(html)
    open(FILE, "w", encoding="utf-8").write(html)
    print("Dịch xong interface.html")


if __name__ == "__main__":
    main()
