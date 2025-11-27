import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Package, Truck, CreditCard, RotateCcw } from 'lucide-react';

interface HelpPageProps {
  onNavigate: (page: string) => void;
}

const faqs = [
  {
    category: 'Orders & Shipping',
    icon: Package,
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery. Free shipping is available on orders over $50.',
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you will receive a confirmation email with a tracking number. You can also view your order status in the "My Orders" section of your account.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping times vary by destination but typically take 7-14 business days.',
      },
      {
        question: 'What if my order arrives damaged?',
        answer: 'We take great care in packaging all items. If your order arrives damaged, please contact us within 48 hours with photos and we will send a replacement immediately.',
      },
    ],
  },
  {
    category: 'Products',
    icon: Truck,
    questions: [
      {
        question: 'Are these authentic Hot Wheels products?',
        answer: 'Yes, all products in our store are 100% authentic Hot Wheels merchandise. We source directly from official distributors.',
      },
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of purchase for unopened items in original condition. Refunds are processed within 5-7 business days.',
      },
      {
        question: 'Do you restock sold-out items?',
        answer: 'We regularly restock popular items. You can sign up for restock notifications on product pages. Limited edition items may not be restocked.',
      },
      {
        question: 'Are the products suitable for all ages?',
        answer: 'Most Hot Wheels products are recommended for ages 3 and up due to small parts. Each product page lists the recommended age range.',
      },
    ],
  },
  {
    category: 'Payment',
    icon: CreditCard,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All transactions are secure and encrypted.',
      },
      {
        question: 'Is it safe to enter my credit card information?',
        answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.',
      },
      {
        question: 'Can I use multiple payment methods for one order?',
        answer: 'Currently, we only support one payment method per order. If you need to split payment, please place separate orders.',
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'For orders over $100, we offer payment plans through our partner services. This option will be available at checkout.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: RotateCcw,
    questions: [
      {
        question: 'How do I return an item?',
        answer: 'To initiate a return, go to your order history and select "Request Return". You will receive a prepaid return label via email.',
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to your original payment method.',
      },
      {
        question: 'Can I exchange an item?',
        answer: 'Yes, we accept exchanges for items of equal or lesser value. Contact customer service to arrange an exchange.',
      },
      {
        question: 'What items cannot be returned?',
        answer: 'Limited edition and collectible items that have been opened cannot be returned. Custom orders and gift cards are also non-returnable.',
      },
    ],
  },
];

export function HelpPage({ onNavigate }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
              <HelpCircle className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions or contact our support team
            </p>
          </div>

          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-lg transition-colors shadow-md"
              />
            </div>
          </div>

          {searchQuery && filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">Try different keywords or browse the categories below</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                  </div>

                  <div className="space-y-3">
                    {category.questions.map((item) => (
                      <div
                        key={item.question}
                        className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleQuestion(item.question)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-lg text-gray-900 pr-4">
                            {item.question}
                          </span>
                          {openQuestion === item.question ? (
                            <ChevronUp className="w-6 h-6 text-primary-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                          )}
                        </button>

                        {openQuestion === item.question && (
                          <div className="px-6 pb-6">
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="mb-6 text-lg">Our support team is here to assist you with any questions or concerns.</p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Contact Support
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Track Order</h4>
              <p className="text-sm text-gray-600 mb-4">Check your order status</p>
              <button
                onClick={() => onNavigate('orders')}
                className="text-primary-600 font-semibold hover:text-primary-700 text-sm"
              >
                View Orders
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Returns</h4>
              <p className="text-sm text-gray-600 mb-4">Start a return request</p>
              <button
                onClick={() => onNavigate('orders')}
                className="text-primary-600 font-semibold hover:text-primary-700 text-sm"
              >
                Manage Returns
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Payment Issues</h4>
              <p className="text-sm text-gray-600 mb-4">Get help with payments</p>
              <button
                onClick={() => onNavigate('contact')}
                className="text-primary-600 font-semibold hover:text-primary-700 text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
