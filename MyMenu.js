const { CardFactory, MessageFactory, ActionTypes } = require('botbuilder');
const path = require('path');
const fs = require('fs');

class MyMenu {

    mainMenu() {

        const imageData = fs.readFileSync(path.join(__dirname, '/resources/logo_shera_web.png'));
        const base64Image = Buffer.from(imageData).toString('base64');

        const contentUrl = `data:image/png;base64,${base64Image}`;

        const buttons = [
            { type: ActionTypes.ImBack, title: 'เคลมคุณภาพ', value: 'เคลมคุณภาพ' },
            { type: ActionTypes.ImBack, title: 'ติดต่อเจ้าหน้าที่', value: 'ติดต่อเจ้าหน้าที่' }
        ];

        return CardFactory.heroCard(
            'SHERA CRM',
            'ยินดีต้อนรับสู่ บริการแจ้งเคลมคุณภาพ ท่านสามารถเลือกบริการตามรายการด้านล่างได้เลยค่ะ',
            [contentUrl],
            buttons
        );
    }

    summaryMenu(user) {
        return {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "ColumnSet",
                    "separator": true,
                    "columns": [
                        {
                            "type": "Column",
                            "width": 2,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อผู้แจ้ง"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "รหัสร้านค้าหลัก"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อร้านค้าหลัก"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ที่อยู่ร้านค้า"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อร้านค้าย่อย"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อผู้ติดต่อ"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "เบอร์ติดต่อ"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ที่อยู่ลูกค้าที่เกิดปัญหา"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ผลิตภัณฑ์"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ขนาด"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "สี"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "จำนวน"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ปัญหาที่เกิด"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 3,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": user.name,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.sapId,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.customerName,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.customerAddress,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.subCustName,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.contactName,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.phone,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.problemAddress,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.product,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.size,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.color,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.qty,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.problem + " เกิด" + user.whenInstall,
                                    "isSubtle": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    productsMenu() {
        return CardFactory.heroCard(
            'กรุณาเลือกรายการชนิดสินค้าค่ะ',
            '',
            [],
            ['ลอนคู่', 'ไตรลอน', 'แกรนาดา', 'แม็กมา', 'ชิงเกิล', 'สเลท', 'เฌอร่า']
        );
    }

    whenInstallMenu() {
        return CardFactory.heroCard(
            'กรุณาเลือกช่วงที่สินค้าเกิดปัญหาค่ะ',
            '',
            [],
            ['ก่อนติดตั้ง', 'หลังติดตั้ง']
        );
    }

    lwrBeforeInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ลอนคู่',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว/เปราะ', 'สีซีดจาง', 'คราบขาว', 'ขนาดไม่ได้มาตรฐาน', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว/เปราะ', 'สีซีดจาง', 'คราบขาว', 'ขนาดไม่ได้มาตรฐาน', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ครอบลอนคู่ & ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว/เปราะ', 'สีซีดจาง', 'คราบขาว', 'จำนวนไม่ครบ']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ LWR ก่อนการติดตั้งค่ะ')
    }

    lwrAfterInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ลอนคู่',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว', 'สีซีดจาง', 'คราบขาว', 'มุงแล้วรั่วซึม', 'ฉ่ำน้ำ', 'โก่งตัว']
                ),
                CardFactory.heroCard(
                    'ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว', 'สีซีดจาง', 'คราบขาว', 'มุงแล้วรั่วซึม', 'ฉ่ำน้ำ', 'โก่งตัว']
                ),
                CardFactory.heroCard(
                    'ครอบลอนคู่ & ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว', 'สีซีดจาง', 'คราบขาว', 'มุงแล้วรั่วซึม']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ LWR หลังการติดตั้งค่ะ')
    }

    sheraBeforeInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ไม้ฝา',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไม้พื้น',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไม้ระแนง',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไม้รั้ว',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'เชิงชาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'บอร์ด',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'บอร์ดลาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'แผ่นลายฉลุ',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ SHERA ก่อนการติดตั้งค่ะ')
    }

    sheraAfterInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ไม้ฝา',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'ไม้พื้น',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง']
                ),
                CardFactory.heroCard(
                    'ไม้ระแนง',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'ไม้รั้ว',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'เชิงชาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'บอร์ด',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'สินค้าไม่แข็งแรง']
                ),
                CardFactory.heroCard(
                    'บอร์ดลาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง']
                ),
                CardFactory.heroCard(
                    'แผ่นลายฉลุ',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ SHERA หลังการติดตั้งค่ะ')
    }

    cancelButton() {
        return CardFactory.heroCard(
            '',
            '',
            [],
            ['ยกเลิก']
        );
    }

    menuButton() {
        return CardFactory.heroCard(
            '',
            '',
            [],
            ['เมนูหลัก']
        );
    }
}

module.exports.MyMenu = MyMenu;