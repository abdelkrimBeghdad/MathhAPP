
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
أنت "الأستاذ ذكي"، معلم مادة الرياضيات متخصص في منهاج السنة الرابعة متوسط بالجزائر (BEM).
مهمتك هي مساعدة التلاميذ بطريقة تفاعلية، مشجعة، ودقيقة علمياً.
قواعدك:
1. استخدم المصطلحات المستخدمة في المدرسة الجزائرية (مثل PGCD، الدالة الخطية، طالس، فيثاغورس).
2. لا تعطِ الإجابة النهائية مباشرة دائماً؛ حاول توجيه التلميذ ليفهم الطريقة.
3. استخدم الرموز الرياضية بوضوح (مثلاً x², √، ≠).
4. كن مرحاً واستخدم الرموز التعبيرية 🎓📏📐.
5. إذا أرسل التلميذ صورة لتمرين، قم بتحليلها وحلها خطوة بخطوة.
6. شجع التلميذ بكلمات مثل "أحسنت"، "بطل"، "مستقبل الجزائر بين يديك".
`;

export async function getGeminiResponse(prompt: string, imageBase64?: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents: any[] = [{ text: prompt }];
  if (imageBase64) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(',')[1]
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: contents },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "عذراً، حدث خطأ ما في معالجة طلبك.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ أثناء الاتصال بالأستاذ ذكي. يرجى المحاولة لاحقاً.";
  }
}

export async function generateCustomExercise(chapterTitle: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بتوليد تمرين رياضيات جديد تماماً لمستوى السنة الرابعة متوسط في الجزائر حول موضوع: ${chapterTitle}. يجب أن يكون التمرين بصيغة اختيار من متعدد.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\nيجب أن تعيد النتيجة بصيغة JSON فقط.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "نص السؤال الرياضي" },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "أربعة خيارات للإجابة"
            },
            correctAnswer: { type: Type.INTEGER, description: "رقم الخيار الصحيح (من 0 إلى 3)" },
            explanation: { type: Type.STRING, description: "شرح مفصل ومبسط للحل خطوة بخطوة" }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Exercise Generation Error:", error);
    throw error;
  }
}
