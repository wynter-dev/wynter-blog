export type CategoryNode = {
  label: string;
  value: string;
  children?: CategoryNode[];
};

export const RAW_CATEGORIES = [
  {
    "label": "개발",
    "value": "dev",
    "children": [
      {
        "label": "프론트엔드",
        "value": "frontend",
        "children": [
          {
            "label": "React",
            "value": "react"
          },
          {
            "label": "Next",
            "value": "next"
          }
        ]
      },
      {
        "label": "인프라",
        "value": "infra"
      },
      {
        "label": "백엔드",
        "value": "backend",
        "children": []
      },
      {
        "label": "기타",
        "value": "etc"
      }
    ]
  },
  {
    "label": "공인중개사",
    "value": "realtor",
    "children": [
      {
        "label": "개인 공부",
        "value": "study"
      },
      {
        "label": "부동산 이론",
        "value": "theory"
      },
      {
        "label": "기타",
        "value": "etc"
      }
    ]
  },
  {
    "label": "일상",
    "value": "life",
    "children": [
      {
        "label": "맛집",
        "value": "food"
      }
    ]
  }
] satisfies CategoryNode[];
